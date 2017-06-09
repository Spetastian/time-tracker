const bcrypt = require('bcrypt')
const saltRounds = 8

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
	hashPassword,
	verifyPassword
}