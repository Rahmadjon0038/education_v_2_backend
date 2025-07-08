const cloudinary = require('../utils/cloudinary'); // cloudinary.js ichidagi config
const sequelize = require('../config/db');

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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, username } = req.body;

  let updateFields = [];
  let values = [];

  if (firstname) {
    updateFields.push('firstname = ?');
    values.push(firstname);
  }  

  if (lastname) {
    updateFields.push('lastname = ?');
    values.push(lastname);
  }

  if (username) {
    updateFields.push('username = ?');
    values.push(username);
  }

  if (req.file && req.file.path) {
    updateFields.push('avatar = ?');
    values.push(req.file.path); // Cloudinary'dan qaytgan secure_url avtomatik req.file.path sifatida keladi
    console.log('Fayl:', req.file);

  }

  if (updateFields.length === 0) {
    return res.status(400).json({ message: "Hech narsa o‘zgartirilmadi" });
  }

  const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
  values.push(id);

  try {
    const [result] = await sequelize.query(query, {
      replacements: values,
    });

    res.status(200).json({ message: 'Foydalanuvchi yangilandi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Yangilashda xatolik' });
  }
};
module.exports = { getUser, updateUser };
