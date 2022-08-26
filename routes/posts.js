var express = require('express');
var router = express.Router();

const { createPost, findAllPosts, findPostById, updatePost, deletePost } = require('../controller/posts');

const { createComment , findAllComments, findCommentById, updateComment, deleteComment } = require('../controller/comments');

router.get('/', findAllPosts);

router.post('/', createPost);

router.get('/:id', findPostById);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.post('/:id/comments', createComment);

router.get('/:id/comments', findAllComments);

router.get('/:post_id/comments/:comment_id', findCommentById);

router.put('/:post_id/comments/:comment_id', updateComment);

router.delete('/:post_id/comments/:comment_id', deleteComment);

module.exports = router;
