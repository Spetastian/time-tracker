const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serveStatic = require('koa-static')

const app = new Koa()
const { Database } = require('./db')
const {
	AuthService,
	ProfileService,
	ReportService,
	TimeCardService,
	ProjectService,
	UserService
} = require('./services')

const port = process.env.PORT || 3000
const mongoDbUri = process.env.MONGODB_URI || 'ds062919.mlab.com:62919/timetracker'
const mongoDbUser = process.env.MONGODB_USER || 'timetracker'
const mongoDbPass = process.env.MONGODB_PASS || 'TimeTracker123'
const db = new Database({ mongoDbUri, mongoDbUser, mongoDbPass })

const authService = new AuthService({ db, prefix: 'auth' })
const profileService = new ProfileService({ db, prefix: 'profiles' })
const reportService = new ReportService({ db, prefix: 'reports' })
const timeCardService = new TimeCardService({ db, prefix: 'timecards' })
const projectService = new ProjectService({ db, prefix: 'projects' })
const userService = new UserService({ db, prefix: 'users' })

const router = new Router()

router.get('/', serveStatic('./dist'))

authService.setupRoutes(router)
userService.setupRoutes(router)
profileService.setupRoutes(router)
reportService.setupRoutes(router)
timeCardService.setupRoutes(router)
projectService.setupRoutes(router)

app
	.use(async (ctx, next) => {
		try {
			await next()
		}
		catch (err) {
			console.error(err)
			ctx.body = err
		}
	})
	.use(bodyParser())
	.use(async (ctx, next) => {
		if (!ctx.accepts('json'))
			ctx.throw(406, 'Only accepts json content')

		await next()
	})
	.use(router.routes())
	.use(router.allowedMethods())
	.on('error', (err, ctx) => {
		console.error('server error', err)
		ctx.body = 'oops error'
	})


db
.connect()
.then(() => {
	console.info('MongoDB connected')
	app.listen(port)
})


