'use strict';

var _user = require('./user');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
// import ToDo from './todo'

_mongoose2.default.connect('mongodb://localhost/fist_mongodb').then(function () {
    return console.log('connection succesful');
}).catch(function (err) {
    return console.error(err);
});

var db = {};

db['users'] = _user.User;
// db['todo'] = ToDo

module.exports = db;