const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,           // EMAIL manzili takrorlanmasligi kerak
        allowNull: false,
        validate: {
            isEmail: true       // format emailga mosligini tekshiradi
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
},
    {
        tableName: 'users',
        timestamps: true
    });

module.exports = User;
