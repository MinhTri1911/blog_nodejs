'use strict';

var _user = require('../models/user');

var auth = function auth(req, res, next) {
    var token = req.header('x-auth');

    _user.User.findByToken(token).then(function (user) {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch(function (e) {
        res.status(401).send();
    });
};

module.exports = { auth: auth };