import {User} from './user'
// import ToDo from './todo'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/fist_mongodb')
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err))

let db = {}

db['users'] = User
// db['todo'] = ToDo

module.exports = db
