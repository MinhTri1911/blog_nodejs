import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

let UserSchema = new mongoose.Schema({
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
		required: true,
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
})

// UserSchema.methods.toJSON = function () {
// 	let user = this
// 	let userObject = user.toObject()

// 	return _.pick(userObject, ['_id', 'email'])
// }

UserSchema.methods.generateAuthToken = function () {
	let user = this
	let access = 'auth'
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'minhtri1911').toString()
	// user.tokens[0].access = access
	// user.tokens[0].token = token
	user.tokens.push({access: access, token: token})

	return user.save().then(() => {
		return token
	})
}

UserSchema.pre('save', function (next) {
	let user = this;

	if (user.isModified('password')) {
		bcrypt.hash(user.password, 10, function (err, hash) {
			user.password = hash
		})

		next()
	} else {
		next()
	}
})

UserSchema.statics.findByToken = function (token) {
    try {
		let decoded = jwt.verify(token, 'minhtri1911')

		return this.findOne({
			_id: decoded._id,
			'tokens.token': token,
			'tokens.access': 'auth'
		})
    } catch (e) {
        return Promise.reject('test')
    }
}

UserSchema.methods.removeToken = function (obj) {
	this.tokens = []

    return this.save(err => {
		if (err) {
			throw new Error('Remove token error')
		}
	})
}

let User = mongoose.model('User', UserSchema)

module.exports = {User}
