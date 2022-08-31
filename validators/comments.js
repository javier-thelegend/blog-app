const { param, validationResult} = require('express-validator')

//This validate function can be a helper to reuse code but is not in scope
const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        const errors = err.array()
        res.status(400).json({ valid: false, message: `${errors[0].msg}, current value : ${errors[0].value}` })
    }
}

module.exports.validateCommentId = [
    param('post_id').isInt().withMessage('Post Id must be Integer'),
    param('comment_id').isInt().withMessage('Comment Id must be Integer'),
    validate
]
