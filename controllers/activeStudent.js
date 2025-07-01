const ActiveStudent = require('../models/activeStudent')

const activeStudent = async (req, res) => {
    const { username, firstname, desc } = req.body;
    try {
        const imageUrl = req.file?.path || null;
        if (!imageUrl) console.warn('Rasm yuklanmadi, images null bo‘lib saqlandi!');

        const newStudent = await ActiveStudent.create({
            username,
            firstname,
            desc,
            images: imageUrl
        });

        res.status(201).json({
            msg: "Ma'lumot muvaffaqiyatli qo‘shildi",
            data: newStudent
        });
    } catch (err) {
        res.status(500).json({ error: 'Server xatosi!' });
    }
};


// GET - Barcha active studentlarni olish
const getAllActiveStudents = async (req, res) => {
    try {
        const students = await ActiveStudent.findAll();
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Maʼlumotlarni olishda xatolik!' });
    }
};

module.exports = {
    activeStudent,
    getAllActiveStudents
};
