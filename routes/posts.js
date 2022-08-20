var express = require('express');
var router = express.Router();

const { createPost, findAllPosts, findPostById, updatePost, deletePost } = require('../controller/posts');

router.get('/', findAllPosts);

router.post('/', createPost);

router.get('/:id', findPostById);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;
