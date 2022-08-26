const Comments = require('../model/comments');
const Posts = require('../model/posts');

const getTotalsOfPagination = (totalElements, pageSize, pageNo) => {
    const totalPages = Math.ceil(totalElements / pageSize)
    return { totalElements, totalPages, lastOne: (totalPages - 1) == pageNo }
}

module.exports.findAllPosts = (req, res, next) => {
    //Pagination Parameters
    const pageNo = parseInt(req.query.pageNo);
    const pageSize = parseInt(req.query.pageSize);
    const sortBy = req.query.sortBy || "id";    //By default sort by id
    const sortDir = req.query.sortDir.toLowerCase() === "asc" ? "asc" : "desc";

    //Implement Pagination
    Posts.findAndCountAll({
        order: [[sortBy, sortDir]],
        limit: pageSize || 10,          //By default get 10 records
        offset: pageNo * pageSize || 0, //By default get page 0
        include: [{                     
            model: Comments,            //Include Comments but only Name and Body fields attribtues: ['name', 'body']
            attributes: ['id','name','email','body']
        }]
    })
        .then((result) => {
            const { totalElements, totalPages, lastOne } = getTotalsOfPagination(result.count, pageSize, pageNo)
            var response = {
                content: result.rows,
                pageNo,
                pageSize,
                totalElements,
                totalPages,
                lastOne
            }
            res.status(200).json({ valid: true, data: response })
        })
        .catch((e) => res.status(400).json({ valid: false, message: e }))
}

module.exports.createPost = (req, res, next) => {
    Posts.create({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    })
        .then((result) => {
            res.status(200).json({ valid: true, data: result })
        })
        .catch((e) => res.status(400).json({ valid: false, message: e }))
}

module.exports.findPostById = (req, res, next) => {
    Posts.findByPk(req.params.id)
        .then((result) => {
            if(result) {
                res.status(200).json({ valid: true, data: result })
            } else {
                res.status(404).json({ valid: false, message: `Post Not Found with Id : '${req.params.id}'` })
            }
        })
        .catch((e) => res.status(400).json({ valid: false, message: e }))
}

module.exports.updatePost = (req, res, next) => {
    Posts.update({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }, {
        where: {
            id: req.params.id
        },
        returning: true
    })
        .then((result) => {
            res.status(200).json({ valid: true, data: result[1] })
        })
        .catch((e) => res.status(400).json({ valid: false, message: e }))
}

module.exports.deletePost = (req, res, next) => {
    Posts.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(200).json({ valid: true, message: "Post " + req.params.id + " Deleted Successfully" })
        })
        .catch((e) => res.status(400).json({ valid: false, message: e }))
}

// const Posts = require('../model/posts');

// module.exports.createPost = (req, res, next) => {
//     const args = [req.body.title, req.body.description, req.body.content]
//     Posts.create(args)
//         .then((result) => {
//             res.status(200).json({ valid: true, data: result.rows })
//         })
//         .catch((e) => res.status(400).json({ valid: false, message: e }))
// }

// module.exports.findAllPosts = (req, res, next) => {
//     Posts.findAll()
//         .then((result) => {
//             res.status(200).json({ valid: true, data: result.rows })
//         })
//         .catch((e) => res.status(400).json({ valid: false, message: e }))
// }

// module.exports.findPostById = (req, res, next) => {
//     const args = [req.params.id]
//     Posts.findPostById(args)
//         .then((result) => {
//             if(result.rowCount == 0){
//                 res.status(400).json({ valid: true, message: `Post not found with id : '${req.params.id}'` })
//             } else {
//                 res.status(200).json({ valid: true, data: result.rows })
//             }
//         })
//         .catch((e) => res.status(400).json({ valid: false, message: e }))
// }

// module.exports.updatePost = (req, res, next) => {
//     const args = [req.body.title, req.body.description, req.body.content, req.params.id]
//     Posts.updatePost(args)
//         .then((result) => {
//             res.status(200).json({ valid: true, data: result.rows })
//         })
//         .catch((e) => res.status(400).json({ valid: false, message: e }))
// }

// module.exports.deletePost = (req, res, next) => {
//     const args = [req.params.id]
//     Posts.deletePost(args)
//         .then(() => {
//             res.status(200).json({ valid: true, message: "Post " + req.params.id + " Deleted Successfully" })
//         })
//         .catch((e) => res.status(400).json({ valid: false, message: e }))
// }