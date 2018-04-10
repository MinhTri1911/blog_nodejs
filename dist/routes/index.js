'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../app/controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _auth = require('../app/middleware/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  _controllers2.default.HomeController.index(req, res);
});

router.post('/register', function (req, res, next) {
  _controllers2.default.RegisterController.store(req, res);
});

router.post('/login', function (req, res) {
  _controllers2.default.LoginController.login(req, res);
});

router.post('/logout', _auth.auth, function (req, res) {
  _controllers2.default.LoginController.logout(req, res);
});

router.get('/demo/:id', function (req, res) {
  res.send('Hello');
});

router.get('/dashboard', function (req, res, next) {
  res.render('pages/dashboard');
});

module.exports = router;