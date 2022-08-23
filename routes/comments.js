var express = require('express');
var router = express.Router();

const { createComment } = require('../controller/comments');

router.post('/', createComment);

module.exports = router;
