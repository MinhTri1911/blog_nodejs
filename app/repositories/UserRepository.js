import BaseRepository from "./BaseRepository";
import bcrypt from 'bcryptjs'

export default class UserRepository extends BaseRepository {
    constructor () {
        super('users')
    }

    async authenUser (email, password) {
        return await this.find({email: email}).then((result) => {
            return bcrypt.compare(password, result[0].password).then(function (res) {
                if (res) return result[0]

                return {}
            })
        })
    }

    async logout (data) {
        return await this.find({email: data.email}).then((user) => {
            if (!user[0]) throw new Error('Not found user')
            console.log(user[0].tokens)
            user[0].removeToken(user[0].tokens[0])
        })
    }

    async registerUser (data) {
        let userCreate = this.create(data).then((res) => {
            let currentUser = this.find({email: data.email}).then((user) => {
                if (!user[0]) throw new Error('Not found user')

                user[0].generateAuthToken()

                return user
            })

            return currentUser
        })

        return await userCreate
    }
}
