const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bycript = require('bcryptjs')

const register = async (req, res) => {
    const { firstname, lastname, username, email, password, role } = req.body;
    try {
        // Bazadan email bor-yo'qligini tekshirish
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Bu email allaqachon ro‘yxatdan o‘tgan" });
        }

        // Passwordni hash qilish
        const hashedPassword = await bycript.hash(password, 10);

        // Foydalanuvchini yaratish
        const newUser = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "Ro‘yxatdan o‘tish muvaffaqiyatli", userId: newUser.id, });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    try {
        const user = await User.findOne({ where: { username } })
        if (!user) {
            return res.status(404).json({ error: 'Foydalanuvchi topilmadi' })
        }
        const isMatch = await bycript.compare(password, user.password) //prolni tekshirish hash bilan
        if (!isMatch) return res.status(401).json({ error: 'Parol noto‘g‘ri' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '12h' });

        res.json({ message: 'Tizimga kirildi', token, id: user.id,role:user.role});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login xatosi' });
    }
}

module.exports = { register, login }