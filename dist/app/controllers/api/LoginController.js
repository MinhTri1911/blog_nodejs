'use strict';

var _Response = require('../../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _repositories = require('../../repositories');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var u = new _repositories.UserRepository();

module.exports = {
    index: async function index(req, res) {
        try {
            return await _Response2.default.render(res, 'pages/login');
        } catch (error) {
            return res.status(500).send(_Response2.default.returnError('Error handle', 500));
        }
    },
    login: async function login(req, res, next) {
        try {
            return await u.authenUser(req.body.email, req.body.password).then(function (user) {
                if (user !== {}) user.generateAuthToken();

                res.send(user);
            });
        } catch (error) {
            return res.status(500).send(_Response2.default.returnError('Error handle', 500));
        }
    },
    logout: async function logout(req, res) {
        try {
            u.logout(req.body);

            return await res.status(200).send('logout success');
        } catch (error) {
            throw new Error(error);
        }
    }
};