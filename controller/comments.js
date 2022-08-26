const Comments = require('../model/comments');

const Posts = require('../model/posts');

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
        attributes: {
            exclude: ['post_id']
        },
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

module.exports.findCommentById = async (req, res, next) => {

    const { post_id, comment_id } = req.params

    const Post = await Posts.findByPk(post_id)
    if (Post == null) {
        res.status(404).json({ valid: false, message: `Post Not Found with id : '${post_id}'` })
        return;
    }

    const Comment = await Comments.findByPk(comment_id)
    if (Comment == null) {
        res.status(404).json({ valid: false, message: `Comment Not Found with id : '${comment_id}'` })
        return;
    }

    if (Comment.post_id != Post.id) {
        res.status(400).json({ valid: false, message: "Comment does not belong to Post" })
    } else {
        const { id, name, email, body } = Comment
        const result = {
            id,
            name,
            email,
            body
        }
        res.status(200).json({ valid: true, data: result })
    }
}

module.exports.updateComment = async (req, res, next) => {

    const { post_id, comment_id } = req.params

    const Post = await Posts.findByPk(post_id)
    if (Post == null) {
        res.status(404).json({ valid: false, message: `Post Not Found with id : '${post_id}'` })
        return;
    }

    const Comment = await Comments.findByPk(comment_id)
    if (Comment == null) {
        res.status(404).json({ valid: false, message: `Comment Not Found with id : '${comment_id}'` })
        return;
    }

    if (Comment.post_id != Post.id) {
        res.status(400).json({ valid: false, message: "Comment does not belong to Post" })
    } else {
        Comments.update({
            name: req.body.name,
            email: req.body.email,
            body: req.body.body
        }, {
            where: {
                id: comment_id
            },
            returning: true
        })
            .then((data) => {
                const { id, name, email, body } = data[1][0]
                const result = {
                    id,
                    name,
                    email,
                    body
                }
                res.status(200).json({ valid: true, data: result })
            })
            .catch((e) => res.status(400).json({ valid: false, message: e }))
    }
}

module.exports.deleteComment = async (req, res, next) => {

    const { post_id, comment_id } = req.params

    const Post = await Posts.findByPk(post_id)
    if (Post == null) {
        res.status(404).json({ valid: false, message: `Post Not Found with id : '${post_id}'` })
        return;
    }

    const Comment = await Comments.findByPk(comment_id)
    if (Comment == null) {
        res.status(404).json({ valid: false, message: `Comment Not Found with id : '${comment_id}'` })
        return;
    }

    if (Comment.post_id != Post.id) {
        res.status(400).json({ valid: false, message: "Comment does not belong to Post" })
    } else {
        Comments.destroy({
            where: {
                id: req.params.comment_id
            }
        })
            .then(() => {
                res.status(200).json({ valid: true, message: "Comment " + req.params.comment_id + " Deleted Successfully" })
            })
            .catch((e) => res.status(400).json({ valid: false, message: e }))
    }
}
