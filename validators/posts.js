const { param, validationResult} = require('express-validator')

const idValidationResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        const errors = err.array()
        res.status(400).json({ valid: false, message: `${errors[0].msg}, current value : ${errors[0].value}` })
    }
}

module.exports.validatePostId = [
    param('id').isInt().withMessage('Post Id must be Integer'),
    idValidationResult
]

module.exports.validateCommentId = [
    param('post_id').isInt().withMessage('Post Id must be Integer'),
    param('comment_id').isInt().withMessage('Comment Id must be Integer'),
    idValidationResult
]
