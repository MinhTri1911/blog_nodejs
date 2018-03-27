'use strict';

var _BaseRepository = require('./BaseRepository');

var _BaseRepository2 = _interopRequireDefault(_BaseRepository);

var _UserRepository = require('./UserRepository');

var _UserRepository2 = _interopRequireDefault(_UserRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    BaseRepository: _BaseRepository2.default,
    UserRepository: _UserRepository2.default
};