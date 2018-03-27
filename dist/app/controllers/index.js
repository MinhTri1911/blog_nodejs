'use strict';

var _HomeController = require('./api/HomeController');

var _HomeController2 = _interopRequireDefault(_HomeController);

var _LoginController = require('./api/LoginController');

var _LoginController2 = _interopRequireDefault(_LoginController);

var _RegisterController = require('./api/RegisterController');

var _RegisterController2 = _interopRequireDefault(_RegisterController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    HomeController: _HomeController2.default,
    LoginController: _LoginController2.default,
    RegisterController: _RegisterController2.default
};