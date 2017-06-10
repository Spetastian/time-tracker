const { hashPassword } = require('./utils/security')

module.exports.insertBasicData = async (db) => {
	let testCompany = await db.Company.findOne({ name: 'TestCompany' })
	console.info('testCompany', testCompany)
	if (!testCompany) {
		testCompany = await db.Company.create({ name: 'TestCompany' })
	}
	

	const adminUser = await db.User.findOne({ username: 'testadmin' })
	console.info('adminUser', adminUser)
	if (!adminUser) {

		const password = await hashPassword('testadmin')
		const newCreds = await db.Credentials.create({ password })

		db.User.create({
			_company: testCompany._id,
			_credentials: newCreds._id,
			username: 'testadmin',
			email: 'testadmin@testcompany.com',
			firstname: 'Admin',
			lastname: 'Adminson',
			role: 'admin'
		})
	}
	
	const managerUser = await db.User.findOne({ username: 'testmanager' })
	console.info('managerUser', managerUser)
	if (!managerUser) {

		const password = await hashPassword('testmanager')
		const newCreds = await db.Credentials.create({ password })

		db.User.create({
			_company: testCompany._id,
			_credentials: newCreds._id,
			username: 'testmanager',
			email: 'testmanager@testcompany.com',
			firstname: 'Manager',
			lastname: 'Managerson',
			role: 'manager'
		})
	}
}