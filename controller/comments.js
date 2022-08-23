const Comments = require('../model/comments');
// const Posts = require('../model/posts');

module.exports.createComment = (req, res, next) => {
    Comments.create({
        name: req.body.name,
        email: req.body.email,
        body: req.body.body,
        post_id: req.params.id //Sending Post Id although is not defined in Comments Model but Posts Model
    })
        .then((result) => {
            res.status(200).json({ valid: true, data: result })
        })
        .catch((e) => res.status(400).json({ valid: false, message: e }))
}

module.exports.findAllComments = (req, res, next) => {
    const post_id = req.params.id
    Comments.findAll({
        where: {
            post_id
        }//,                Can include Post in the response but it's better include comments in Posts.findAll
        // include: {
        //     model: Posts
        // }
    })
        .then((result) => {
            res.status(200).json({ valid: true, data: result })
        })
        .catch((e) => res.status(400).json({ valid: false, message: e }))
}