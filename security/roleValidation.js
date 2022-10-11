const authError = (res, message) => {
    var err = new Error(message)
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    return err
}

const roleValidation = (...allowedRoles) => {
    return (req, res, next) => {
        const { roles } = req.user
        let isAllowed = roles.find(role => {
            if (allowedRoles.includes(role.name)) {
                return true
            }
        })

        if (isAllowed) {
            next()
        } else {
            return next(authError(res, 'Unauthorized Level Access'))
        }
    }
}

module.exports = roleValidation