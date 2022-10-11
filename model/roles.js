const { DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Roles = db.define('roles', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Roles;