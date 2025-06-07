const sequelize = require('../config/db')
const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const result = await sequelize.query('select * from users where id = ?', {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        })

        if (result.length === 0) {
            res.status(404).json({ message: "Foydalanuvchi topilmadi" })
        }
        const userData = {
            id: result[0].id,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            username: result[0].username,
            email: result[0].email,
            role: result[0].role,
            createdAt: result[0].createdAt,
        }
        res.status(200).json(userData)
    } catch (err) {
        console.log('xatolik', err)
        res.status(500).json({ error: 'serverda xatolik' })
    }

}

const updateUser = (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    console.log(id)
    res.status(200).send(id)
}
module.exports = { getUser, updateUser }