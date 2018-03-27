// import HTTPStatus from 'http-status';
import Response from '../../helpers/Response'

import {UserRepository} from '../../repositories'

let u = new UserRepository()

module.exports = {
    async index (req, res) {
        try {
            // let posts = await postRepository.getAll();
            return await Response.render(res, 'pages/dashboard')
        } catch (e) {
            return res
                .status(500)
                .send(Response.returnError(e.message, 500))
        }
    },

    async list (req, res) {
        try {
            let allUser = u.getAll().then((u) => {
                res.send(u)
            })

            // return await res.send(allUser)

        } catch (error) {

        }
    }
}
