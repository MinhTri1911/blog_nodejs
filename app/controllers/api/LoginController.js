import Response from '../../helpers/Response'
import {UserRepository} from '../../repositories'
import bcrypt from 'bcryptjs'

let u = new UserRepository()

module.exports = {
    async index (req, res) {
        try {
            return await Response.render(res, 'pages/login')
        } catch (error) {
            return res
                .status(500)
                .send(Response.returnError('Error handle', 500))
        }
    },

    async login (req, res, next) {
        try {
            console.log(req.body)
            return await u.authenUser(req.body.email, req.body.password).then((user) => {
                if (user !== {}) user.generateAuthToken()

                res.send(user.toJSON())
            })
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .send(Response.returnError('Error handle', 500))
        }
    },

    async logout (req, res) {
        try {
            u.logout(req.body)

            return await res.status(200).send('logout success')
        } catch (error) {
            throw new Error(error)
        }
    }
}
