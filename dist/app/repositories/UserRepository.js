'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseRepository2 = require('./BaseRepository');

var _BaseRepository3 = _interopRequireDefault(_BaseRepository2);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserRepository = function (_BaseRepository) {
    _inherits(UserRepository, _BaseRepository);

    function UserRepository() {
        _classCallCheck(this, UserRepository);

        return _possibleConstructorReturn(this, (UserRepository.__proto__ || Object.getPrototypeOf(UserRepository)).call(this, 'users'));
    }

    _createClass(UserRepository, [{
        key: 'authenUser',
        value: async function authenUser(email, password) {
            return await this.find({ email: email }).then(function (result) {
                return _bcryptjs2.default.compare(password, result[0].password).then(function (res) {
                    if (res) return result[0];

                    return {};
                });
            });
        }
    }, {
        key: 'logout',
        value: async function logout(data) {
            return await this.find({ email: data.email }).then(function (user) {
                if (!user[0]) throw new Error('Not found user');
                console.log(user[0].tokens);
                user[0].removeToken(user[0].tokens[0]);
            });
        }
    }, {
        key: 'registerUser',
        value: async function registerUser(data) {
            var _this2 = this;

            var userCreate = this.create(data).then(function (res) {
                var currentUser = _this2.find({ email: data.email }).then(function (user) {
                    if (!user[0]) throw new Error('Not found user');

                    user[0].generateAuthToken();

                    return user;
                });

                return currentUser;
            });

            return await userCreate;
        }
    }]);

    return UserRepository;
}(_BaseRepository3.default);

exports.default = UserRepository;