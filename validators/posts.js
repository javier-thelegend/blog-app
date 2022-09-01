const { param, checkSchema, validationResult } = require('express-validator')

//This validate function can be a helper to reuse code but is not in scope
const validateId = (req, res, next) => {
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
    validateId
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

module.exports.validatePostBody = [
    checkSchema({
        title: {
            isLength: {
                errorMessage: 'Title should be at least 2 chars long',
                options: { min: 2 }
            }
        },
        description: {
            isLength: {
                errorMessage: 'Description should be at least 10 chars long',
                options: { min: 10 }
            }
        },
        content: {
            notEmpty: {
                errorMessage: 'Content must not be empty'
            }
        }
    }),
    validateBody
]
