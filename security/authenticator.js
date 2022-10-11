var bcrypt = require('bcrypt');
const Roles = require('../model/roles');
var User = require('../model/users')

const authError = (res, message) => {
    var err = new Error(message)
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    return err
}

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader == undefined) {
        return next(authError(res, 'You are not authenticated'))
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var pass = auth[1];

    let user = await User.findOne({
        where: {
            username: username
        },
        include: {
            model: Roles,
            through: {
                attributes: [] //Exclude UserRoles
            }
        }
    })
    // console.log('User: ' + JSON.stringify(user, null, 2))
    if (user) {
        if (await bcrypt.compare(pass, user.password)) {
            const { password, ...others } = user.dataValues
            req.user = others
            next()
        } else {
            return next(authError(res, 'Password verification failed'))
        }
    } else {
        return next(authError(res, 'User not found'))
    }
}

module.exports = authentication