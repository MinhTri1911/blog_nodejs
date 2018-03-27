'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _assert = require('assert');

var _user = require('../models/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseRepository = function () {
    function BaseRepository(className) {
        _classCallCheck(this, BaseRepository);

        this._model = _models2.default[className];
        this._model_name = className;
    }

    _createClass(BaseRepository, [{
        key: 'getAll',
        value: async function getAll() {
            var all = this._model.find({}).then(function (users) {
                return users;
            });

            return await all;
        }
    }, {
        key: 'find',
        value: async function find(condition) {
            return await this._model.find(condition).then(function (result) {
                return result;
            });
        }
    }, {
        key: 'create',
        value: async function create(data) {
            var model = this._model;
            var result = new model(data);

            return await result.save(function (err) {
                if (err) {
                    throw new Error('Create data error');
                }
            });
        }
    }]);

    return BaseRepository;
}();

exports.default = BaseRepository;