import Response from '../../helpers/Response'
import {UserRepository, BaseRepository} from '../../repositories'
import bcrypt from 'bcryptjs'

let u = new UserRepository()

module.exports = {
    async index(req, res) {
        try {
            return await Response.render(res, 'pages/register')
        } catch (error) {
            return await res.error(404).send('Page not fount', 404)
        }
    },

    store(req, res) {
        try {
            let hash = bcrypt.hashSync(req.body.password, 10)

            let user = {
                email : req.body.email,
                name : req.body.name,
                password : hash,
                avatar : "avatar.png"
            }

            u.registerUser(user).then((result) => {
                res.send(result)
            })

        } catch (error) {
            res.error(500).send()
        }
    }
}
