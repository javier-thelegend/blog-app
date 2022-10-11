const { DataTypes } = require('sequelize');
const db = require('../db/sequelize');
const Roles = require('./roles');
const UserRoles = require('./userRoles');

const Users = db.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

Users.belongsToMany(Roles, {
    through: UserRoles,
    foreignKey: 'user_id'
});

Roles.belongsToMany(Users, {
    through: UserRoles,
    foreignKey: 'role_id'
});

module.exports = Users;