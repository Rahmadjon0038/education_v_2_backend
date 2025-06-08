const sequelize = require('../config/db');
const multer = require('multer');
const path = require('path');

// Multer sozlamalari
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.params.id + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

// getUser funksiyasi (o'zgarmadi)
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sequelize.query('select * from users where id = ?', {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });

        if (result.length === 0) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
        const userData = {
            id: result[0].id,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            username: result[0].username,
            email: result[0].email,
            role: result[0].role,
            avatar: result[0].avatar,    // avatar ustuni ham qaytariladi
            createdAt: result[0].createdAt,
        };
        res.status(200).json(userData);
    } catch (err) {
        console.log('xatolik', err);
        res.status(500).json({ error: 'serverda xatolik' });
    }
};

// updateUser funksiyasi - multer middleware bilan birga ishlash uchun funksiya ko‘rinishida
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, username } = req.body;

    let updateFields = [];
    let values = [];

    if (firstname && firstname.trim().length > 0) {
        updateFields.push("firstname = ?");
        values.push(firstname);
    }
    if (lastname && lastname.trim().length > 0) {
        updateFields.push("lastname = ?");
        values.push(lastname);
    }
    if (username && username.trim().length > 0) {
        updateFields.push("username = ?");
        values.push(username);
    }

    if (req.file) {
        updateFields.push("avatar = ?");
        values.push(req.file.path); // yoki agar URL bo'lsa shu qiymat
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ message: "Hech qanday ma'lumot kiritilmadi" });
    }

    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    values.push(id);

    try {
        const [result] = await sequelize.query(query, {
            replacements: values
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        res.status(200).json({ message: "Foydalanuvchi muvaffaqiyatli yangilandi" });
    } catch (err) {
        console.error("Xatolik:", err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

module.exports = { getUser, updateUser, upload };
