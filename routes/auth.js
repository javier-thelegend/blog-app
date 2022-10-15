var express = require('express');
const { singIn, singUp } = require('../controller/auth');
var router = express.Router();

router.post('/signin', singIn);
router.post('/signup', singUp);

module.exports = router;