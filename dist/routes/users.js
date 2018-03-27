'use strict';

var _models = require('../app/models');

var _models2 = _interopRequireDefault(_models);

var _controllers = require('../app/controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _auth = require('../app/middleware/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', _auth.auth, function (req, res) {
  _controllers2.default.HomeController.list(req, res);
});

module.exports = router;