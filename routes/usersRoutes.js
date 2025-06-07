const exporess = require('express')
const usersdata = require('../controllers/usersdata')
const router = exporess.Router()
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/:id',authMiddleware, usersdata.getUser)
router.patch('/:id',usersdata.updateUser)


module.exports = router