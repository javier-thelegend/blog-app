const { DataTypes } = require('sequelize');
const db = require('../db/sequelize');

//Automatically takes both columns as PK that's why 2nd parameter is {} = empty
const userRoles = db.define('user_roles', {}, {
    timestamps: false
});

module.exports = userRoles;