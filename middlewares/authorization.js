const { User } = require('../models/index')

class Authorization {
    static async check( req, res, next) {
        console.log(User, 'sampe error')
        try {
            const user = req.loggedIn
            console.log(user.role)
            if(user.role !== 'guru') {
                throw {name: 'OutOfAuthority'}
            }
            else {
                next()
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = Authorization