'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		minlength: 1
		// validate: {
		// 	validator: validator.isEmail,
		// 	message: 'Invalid email'
		// }
		// match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	name: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	var obj = this;
	// delete obj.password
	console.log(obj.password);
	return {
		'email': obj.email,
		'name': obj.name,
		'avatar': obj.avatar,
		'tokens': obj.tokens
	};
};

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = _jsonwebtoken2.default.sign({ _id: user._id.toHexString(), access: access }, 'minhtri1911').toString();
	// user.tokens[0].access = access
	// user.tokens[0].token = token
	user.tokens.push({ access: access, token: token });

	return user.save().then(function () {
		return token;
	});
};

UserSchema.pre('save', function (next) {
	var user = this;

	if (user.isModified('password')) {
		_bcryptjs2.default.hash(user.password, 10, function (err, hash) {
			user.password = hash;
		});

		next();
	} else {
		next();
	}
});

UserSchema.statics.findByToken = function (token) {
	try {
		var decoded = _jsonwebtoken2.default.verify(token, 'minhtri1911');

		return this.findOne({
			_id: decoded._id,
			'tokens.token': token,
			'tokens.access': 'auth'
		});
	} catch (e) {
		return Promise.reject('test');
	}
};

UserSchema.methods.removeToken = function (obj) {
	this.tokens = [];

	return this.save(function (err) {
		if (err) {
			throw new Error('Remove token error');
		}
	});
};

var User = _mongoose2.default.model('User', UserSchema);

module.exports = { User: User };