const exporess = require('express')
const authControoler = require('../controllers/authController')
const router = exporess.Router()

router.post('/register', authControoler.register)
router.post('/login', authControoler.login)


module.exports = router