const { param, checkSchema, validationResult} = require('express-validator')

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

const validateBody = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        var response = {};
        err.array().forEach(element => {
            response[element.param] = element.msg
        });
        res.status(400).json({ valid: false, message: response })
    }
}

module.exports.validateCommentBody = [
    checkSchema({
        name: {
            notEmpty: {
                errorMessage: 'Name must not be empty'
            }
        },
        email: {
            isEmail: {
                errorMessage: 'Email is not valid'
            }
        },
        body: {
            isLength: {
                errorMessage: 'Body should be at least 10 chars long',
                options: { min: 10 }
            }
        }
    }),
    validateBody
]
