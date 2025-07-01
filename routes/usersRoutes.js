const express = require('express');
const router = express.Router();
const usersdata = require('../controllers/usersdata');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../utils/multer');
const allusersData = require('../controllers/allUsers')

router.get('/allusers', authMiddleware,allusersData.allusers)
router.get('/:id', authMiddleware, usersdata.getUser);
router.patch('/:id', authMiddleware, upload.single('avatar'), usersdata.updateUser);

//all users router

module.exports = router;
