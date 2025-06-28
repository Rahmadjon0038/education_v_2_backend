const exporess = require('express');
const router = exporess.Router();
const activeStudent = require('../controllers/activeStudent');
const upload = require('../utils/multer');

router.post('/', upload.single('images'), activeStudent.activeStudent)
router.get('/', activeStudent.getAllActiveStudents)

module.exports = router;
