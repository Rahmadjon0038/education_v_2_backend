const sequelize = require('../config/db')
const User = require('../models/User')
const allusers = async (req, res) => {
    try {
        const users = await User.findAll(); // bu select * from users degani
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Xatolik yuz berdi");
    }
}

module.exports = { allusers }