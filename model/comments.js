const { DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Comments = db.define('comments', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    }
    //The model does not need the foreign key because this association is created in posts.js (model)
    // post_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
}, {
    timestamps: false
});

module.exports = Comments;