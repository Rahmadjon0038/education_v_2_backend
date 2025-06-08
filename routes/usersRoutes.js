const exporess = require('express')
const usersdata = require('../controllers/usersdata')
const router = exporess.Router()
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/:id', authMiddleware, usersdata.getUser)
router.patch('/:id', authMiddleware, usersdata.upload.single('avatar'), usersdata.updateUser)


module.exports = router