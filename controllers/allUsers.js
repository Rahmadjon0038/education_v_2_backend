const sequelize = require('../config/db')
const User = require('../models/User')
const allusers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Xatolik yuz berdi");
    }
}

// --------------------- adminUserUpdate ---------------
const userRoleUpdate = async (req, res) => {
    const { role } = req.body
    const { id } = req.params
    try {
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json('foydalanuvchi topilmadi')
        await user.update({ role })
        res.status(200).json({ message: 'Rol muvaffaqiyatli yangilandi', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
}
const userDelete = async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.destroy({ where: { id } })
        if (deleteUser === 0) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
        res.status(200).json({ message: `Foydalanuvchi muvaffaqiyatli Ochirildi` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
}



module.exports = { allusers, userRoleUpdate, userDelete }