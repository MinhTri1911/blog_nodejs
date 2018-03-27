import models from '../models'
import {throws} from 'assert'

import {User} from '../models/user'

export default class BaseRepository {
    constructor (className) {
        this._model = models[className]
        this._model_name = className
    }

    async getAll () {
        let all = this._model.find({}).then((users) => {
            return users
        })

        return await all
    }

    async find (condition) {
        return await this._model.find(condition).then((result) => {
            return result
        })
    }

    async create(data) {
        let model = this._model
        let result = new model(data)

        return await result.save(err => {
            if (err) {
                throw new Error('Create data error')
            }
        })
    }
}
