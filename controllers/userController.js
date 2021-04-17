const { User } = require('../models')
const Bcrypt = require('../helpers/bcrypt')
const Jwt = require('../helpers/jwt')

class UserController {
    static async register (req, res, next) {
        console.log('sampe')
        try {
            const {firstName, lastName, address, email, password, birth_date, level, role } = req.body
            const newUser = await User.create({
                firstName, lastName, address, email, password, birth_date, level, role
            })
            res.status(201).json({
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                address: newUser.address,
                email: newUser.email,
                role: newUser.role,
                birth_date: newUser.birth_date,
                level: newUser.level
            })
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if(!user) {
                throw {name: 'WrongEmailPassword'}
            }
            else {
                if(!Bcrypt.compare(password, user.password)) {
                    throw{ name: 'WrongEmailPassword'}
                }
                else {
                    const token = Jwt.sign({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        gender: user.gender,
                        email: user.email,
                        role: user.role
                    })
                    res.status(200).json({ email: user.email, token, role: user.role})
                }
            }
        }catch(err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = UserController