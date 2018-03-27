import express from 'express'
import Controller from '../app/controllers'
import {auth} from '../app/middleware/auth'

const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  Controller.HomeController.index(req, res)
})

// router.get('/login', function (req, res) {
//   Controller.LoginController.index(req,res)
// })

// router.get('/register', function (req, res, next) {
//   Controller.RegisterController.index(req, res)
// })

router.post('/register', function (req, res, next) {
  Controller.RegisterController.store(req, res)
})

router.post('/login', function (req, res) {
  Controller.LoginController.login(req, res)
})

router.post('/logout', auth, (req, res) => {
  Controller.LoginController.logout(req, res)
})

router.get('/demo/:id', function(req, res) {
  res.send('Hello')
})

router.get('/dashboard', function(req, res, next) {
  res.render('pages/dashboard');
})

module.exports = router
