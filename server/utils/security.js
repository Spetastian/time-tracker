const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 8
const secureRandom = require('secure-random')
const signingKey = secureRandom(256, { type: 'Buffer' })
const url = 'http://localhost:3000' // Fix this.

function createToken({ companyId, userId, role }) {
	const claims = {
		iss: url,  // The URL of your service
		sub: userId, // The UID of the user in your system
		scope: 'self',
		companyId,
		role
	}

	const token = jwt.sign({
		data: claims
	}, signingKey, { expiresIn: '1h' })

	return token
}

function verifyToken(token) {
	return jwt.verify(token, signingKey)
}

function hashPassword(plaintextPassword) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, function (genSaltErr, salt) {
			if (genSaltErr) return reject(genSaltErr)

			bcrypt.hash(plaintextPassword, salt, function (hashErr, hashedPassword) {
				if (hashErr) return reject(hashErr)
				
				return resolve(hashedPassword)
			})
		})
	})
}

function verifyPassword(plaintextPassword, hashedPassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(plaintextPassword, hashedPassword, function (err, res) {
			if (err) return reject(err)
			else if (res === false) return reject(new Error('Password mismatch'))
				
			return resolve()
		})
	})
}

module.exports = {
	verifyToken,
	createToken,
	hashPassword,
	verifyPassword
}