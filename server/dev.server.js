const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const nJwt = require('njwt')
const secureRandom = require('secure-random')
const signingKey = secureRandom(256, { type: 'Buffer' })

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const compiler = webpack(webpackConfig)
const app = express()

const {
	getTimeCard,
	addEntryToTimeCard,
	saveTimeCard
} = require('./database')

app.use(bodyParser.json())
app.use(cookieParser())
app.set('etag', false)


app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: { colors: true }
}))

app.use(webpackHotMiddleware(compiler, {
	log: console.log
}))

app.use(express.static('dist'))

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


app.listen(process.env.PORT || 8080, () => {
	console.log('Server running...')
})