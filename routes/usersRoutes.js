const express = require('express');
const router = express.Router();
const usersdata = require('../controllers/usersdata');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../utils/multer');
const allusersData = require('../controllers/allUsers')

router.get('/allusers', authMiddleware, allusersData.allusers) // barcha userlarni olish  admin uchun
router.patch('/role/:id', allusersData.userRoleUpdate)  //  userni role almashtirish  admin uchun
router.delete('/delete/:id', authMiddleware, allusersData.userDelete); // user delete admin uchun




router.get('/me/:id', authMiddleware, usersdata.getUser); //  user profile malumotlarini olishi
router.patch('/upadteuser/:id', authMiddleware, upload.single('avatar'), usersdata.updateUser);  // user  prfile malumotlarini yangilashi

//all users router

module.exports = router;
