var express = require('express');
var router = express.Router();

const { createPost, findAllPosts, findPostById, updatePost, deletePost } = require('../controller/posts');

const { createComment , findAllComments } = require('../controller/comments');

router.get('/', findAllPosts);

router.post('/', createPost);

router.get('/:id', findPostById);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.get('/:id/comments', findAllComments);

router.post('/:id/comments', createComment);

module.exports = router;
