const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const nJwt = require('njwt')
const secureRandom = require('secure-random')
const signingKey = secureRandom(256, { type: 'Buffer' })
const path = require('path')
const app = express()

const {
	authenticateUser,
	getTimeCard,
	addEntryToTimeCard,
	saveTimeCard
} = require('./database')

app.use(bodyParser.json())
app.use(cookieParser())
app.set('etag', false)

app.use(express.static('dist'))

app.use('/res', express.static('dist'))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.post('/signin', (req, res) => {

	const { username, password } = req.body

	console.log({ username, password })
	
	try {
		authenticateUser({ username, password })

		const claims = {
			iss: 'http://localhost:3000',  // The URL of your service
			sub: username,    // The UID of the user in your system
			scope: 'self'
		}

		const jwt = nJwt.create(claims, signingKey)
		jwt.setExpiration(new Date().getTime() + 60 * 60 * 1000) // One hour from now

		res.status(200).send({ status: 'success', token: jwt.compact() })
	}
	catch (err) {
		console.error(err)
		res.status(401).send('Authentication failed')
	}
})

app.use((req, res, next) => {
	const token = req.cookies && req.cookies.token
	nJwt.verify(token, signingKey, function (err, verifiedJwt) {
		if (err) {
			console.error(err)
			res.status(403).send('Authentication failed')
		}
		else {
			const substitute =  verifiedJwt.body.sub
			req.user = {
				username: substitute
			}
			next()
		}
	})
})

app.get('/authenticate', (req, res) => {
	res.status(200).send('OK')
})

app.get('/timecard/:weekNumber', (req, res) => {
	const { weekNumber } = req.params
	const timeCard = getTimeCard({ username: req.user.username, weekNumber })
	res.status(200).send(timeCard)
})

app.post('/timecard/:weekNumber/add', (req, res) => {
	const { projectId } = req.body
	const { weekNumber } = req.params

	const entries = addEntryToTimeCard({
		username: req.user.username,
		weekNumber,
		projectId
	})

	res.status(200).send(entries)
})

app.post('/timecard/:weekNumber/save', (req, res) => {
	
	const { entries } = req.body
	const { weekNumber } = req.params

	const timeCard = saveTimeCard({
		username: req.user.username,
		weekNumber,
		entries
	})

	res.status(200).send(timeCard)
})


app.listen(process.env.PORT || 3000, () => {
	console.log('Server running...')
})