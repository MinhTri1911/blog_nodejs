'use strict';

var _Response = require('../../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _repositories = require('../../repositories');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import HTTPStatus from 'http-status';
var u = new _repositories.UserRepository();

module.exports = {
    index: async function index(req, res) {
        try {
            // let posts = await postRepository.getAll();
            return await _Response2.default.render(res, 'pages/dashboard');
        } catch (e) {
            return res.status(500).send(_Response2.default.returnError(e.message, 500));
        }
    },
    list: async function list(req, res) {
        try {
            var allUser = u.getAll().then(function (u) {
                res.send(u);
            });

            // return await res.send(allUser)
        } catch (error) {}
    }
};