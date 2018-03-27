var express = require('express');
var router = express.Router();


import Models from '../app/models'
import Controller from '../app/controllers'

import {auth} from '../app/middleware/auth'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', auth, (req, res) => {
    Controller.HomeController.list(req, res)
})

module.exports = router;
