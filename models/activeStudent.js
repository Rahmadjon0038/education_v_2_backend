const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const ActiveStudent = sequelize.define('ActiveStudent', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    images: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
})
module.exports = ActiveStudent;