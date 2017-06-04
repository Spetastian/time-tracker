const data = {
	user1: {
		timeCards: {},
		profile: {
			password: 'user1',
			firstname: 'Claes',
			lastname: 'Nilsson',
			email: 'clanil@company.com'
		}
	},
	user2: {
		timeCards: {},
		profile: {
			password: 'user2',
			firstname: 'Mark',
			lastname: 'Anderson',
			email: 'maran@company.com'
		}
	}
}

let entryId = 0


function createNewTimeCard(weekNumber) {
	return {
		weekNumber,
		entries: []
	}
}

function createNewTimeCardEntry(projectId) {
	return {
		id: entryId++,
		projectId,
		monday: null,
		tuesday: null,
		wednesday: null,
		thursday: null,
		friday: null,
		saturday: null,
		sunday: null
	}
}

function authenticateUser({ username, password }) {
	const user = data[username]
	if (!user || !user.profile.password === password)
		throw new Error('User not found')
}

function getTimeCard({ username, weekNumber }) {
	console.log('getTimeCard', { username, weekNumber })
	if (!data[username]) return null

	if (!data[username].timeCards[weekNumber])
		data[username].timeCards[weekNumber] = createNewTimeCard(weekNumber)

	return data[username].timeCards[weekNumber]
}

function addEntryToTimeCard({ username, weekNumber, projectId }) {
	console.log('addEntryToTimeCard', { username, weekNumber, projectId })
	if (!data[username].timeCards[weekNumber])
		data[username].timeCards[weekNumber] = createNewTimeCard(weekNumber)

	data[username].timeCards[weekNumber]
		.entries.push(createNewTimeCardEntry(projectId))

	return data[username].timeCards[weekNumber].entries
}

module.exports = {
	authenticateUser,
	getTimeCard,
	addEntryToTimeCard
}