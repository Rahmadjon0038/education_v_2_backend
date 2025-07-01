const exporess = require('express');
const sequelize = require('./config/db');
require('dotenv').config()
const cors = require('cors')
const User = require('./models/User'); // Modelni chaqirib ol
const ActiveStudent = require('./models/activeStudent'); // Modelni chaqirib ol
const app = exporess();
app.use(cors())
app.use(exporess.json())

const authRoutes = require('./routes/authRoutes')
const usersRoutes = require('./routes/usersRoutes')
const activeStudent = require('./routes/activeStudent')

app.get('/', (req, res) => {
    res.send({ 'salom': 'Salom bro server yaxshi ishlayapdi' })
})
//ROUTES
app.use('/api/auth', authRoutes)

//USERS
app.use('/api/users',usersRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/users',usersRoutes)

//students
app.use('/api/students',activeStudent)
app.use('/api/students',activeStudent)


// bu code modelga asoslanib bazada table yasaydi 
sequelize.sync({ force: false })
    .then(() => {
        console.log('Jadval yaratildi yoki mavjud jadvalga moslashdi!');
    })
    .catch(err => {
        console.error('Jadval yaratishda xatolik:', err);
    });


app.listen(process.env.PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MariaDB bilan ulanish muvaffaqiyatli!");

    } catch (err) {
        console.error("❌ Ulanishda xatolik:", err);
    }
    console.log(`🚀 Server ${process.env.PORT}-portda ishlayapti`);
})