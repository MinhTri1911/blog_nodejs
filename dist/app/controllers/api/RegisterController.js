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
            return await _Response2.default.render(res, 'pages/register');
        } catch (error) {
            return await res.error(404).send('Page not fount', 404);
        }
    },
    store: function store(req, res) {
        try {
            var hash = _bcryptjs2.default.hashSync(req.body.password, 10);

            var user = {
                email: req.body.email,
                name: req.body.name,
                password: hash,
                avatar: "avatar.png"
            };

            u.registerUser(user).then(function (result) {
                res.send(result);
            });
        } catch (error) {
            res.error(500).send();
        }
    }
};