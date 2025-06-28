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

module.exports = { activeStudent };
