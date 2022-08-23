const { DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Comments = require('./comments');

const Posts = db.define('posts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

//Define Asocciations with Comments Model
Posts.hasMany(Comments, {
    foreignKey: "post_id",
    sourceKey: "id"
});

module.exports = Posts;

// const db = require('../db/index');

// const Posts = {};

// Posts.create = (args) => {
//     const bindings = [...args];
//     const SQL_CREATE_POST = `insert into posts(title, description, content) values($1, $2, $3) returning id, title, description, content`;
//     return db.query(SQL_CREATE_POST, bindings);
// }

// Posts.findAll = () => {
//     const SQL_GET_POSTS = `select * from posts order by id asc`;
//     return db.query(SQL_GET_POSTS);
// }

// Posts.findPostById = (args) => {
//     const bindings = [...args];
//     const SQL_GET_POST_BY_ID = `select * from posts where id = $1`;
//     return db.query(SQL_GET_POST_BY_ID, bindings);
// }

// Posts.updatePost = (args) => {
//     const bindings = [...args];
//     const SQL_UPDATE_POST = `update posts set title = $1, description = $2, content = $3 where id = $4 returning id, title, description, content`;
//     return db.query(SQL_UPDATE_POST, bindings);
// }

// Posts.deletePost = (args) => {
//     const bindings = [...args];
//     const SQL_DELETE_POST = `delete from posts where id = $1`;
//     return db.query(SQL_DELETE_POST, bindings);
// }

// module.exports = Posts;