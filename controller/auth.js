var bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const Roles = require('../model/roles');
const UserRoles = require('../model/userRoles');
const Users = require("../model/users");

const authError = (res, message) => {
    var err = new Error(message)
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    return err
}

module.exports.singIn = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            [Op.or]: [{ username: req.body.usernameOrEmail }, { email: req.body.usernameOrEmail }]
        }
    })
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send("User signed-in successfully")
        } else {
            return next(authError(res, 'Password verification failed'))
        }
    } else {
        return next(authError(res, 'User not found'))
    }
}

module.exports.singUp = async (req, res, next) => {
    //Validate if username already exists
    var user = await Users.findOne({
        where: {
            username: req.body.username
        }
    })
    if (user) {
        res.status(400).json({ valid: false, message: 'Username already exists' })
        return
    }

    user = await Users.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user) {
        res.status(400).json({ valid: false, message: 'Email already exists' })
        return
    }

    const salt = await bcrypt.genSalt(10);
    const passwordEncoded = await bcrypt.hash(req.body.password, salt);
    Users.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: passwordEncoded
    })
        .then((user) => {
            UserRoles.create({
                role_id: 1,
                user_id: user.id
            })
                .then(async (userRoles) => {
                    const role = await Roles.findByPk(userRoles.role_id)
                    var response = {
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        role: role
                    }
                    res.status(200).json({ valid: true, data: response })
                })
                .catch((e) => res.status(400).json({ valid: false, message: e }))
        })
        .catch((e) => res.status(400).json({ valid: false, message: e }))
}