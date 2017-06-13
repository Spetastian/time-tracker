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


app.listen(process.env.PORT || 8080, () => {
	console.log('Server running...')
})