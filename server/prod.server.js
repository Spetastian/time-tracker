const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serveStatic = require('koa-static')
const cors = require('koa-cors')
const authHeader = require('koa-auth-header')
const { verifyToken } = require('./utils/security')
const { insertBasicData } = require('./bootstrapDb')

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

const authService = new AuthService({ db, area: 'auth' })
const profileService = new ProfileService({ db, area: 'profiles' })
const reportService = new ReportService({ db, area: 'reports' })
const timeCardService = new TimeCardService({ db, area: 'timecards' })
const projectService = new ProjectService({ db, area: 'projects' })
const userService = new UserService({ db, area: 'users' })

const authRequiredRouter = new Router()
const publicRouter = new Router()

publicRouter.get('/', serveStatic('./dist'))
authService.setupRoutes(publicRouter)

projectService.setupRoutes(authRequiredRouter)
userService.setupRoutes(authRequiredRouter)
profileService.setupRoutes(authRequiredRouter)
reportService.setupRoutes(authRequiredRouter)
timeCardService.setupRoutes(authRequiredRouter)

app
	.use(async (ctx, next) => {
		try {
			await next()
		}
		catch (err) {
			console.error(err)
			ctx.status = err.status
			ctx.body = err.message
		}
	})
	// TODO: Configure CORS: https://github.com/evert0n/koa-cors
	.use(cors({
		origin: true,
		methods: ['GET', 'POST', 'DELETE'],
		credentials: true,
		headers: ['Authorization', 'Content-Type', 'x-requested-with']
	}))
	.use(async (ctx, next) => {
		if (!ctx.accepts('json'))
			ctx.throw(406, 'Only accepts json content')

		await next()
	})
	.use(bodyParser())
	.use(publicRouter.routes())
	.use(publicRouter.allowedMethods())
	.use(authHeader({
		required: true,
		types: {
			Bearer(value) {
				this.state.token = value
			}
		}
	}))
	.use(async (ctx, next) => {
		try {
			const { token } = ctx.state
			const jwt = verifyToken(token)
			const { companyId, sub, role } = jwt.data
			ctx.state.companyId = companyId
			ctx.state.userId = sub
			ctx.state.userRole = role
		}
		catch (err) {
			console.error(err)
			ctx.throw(401, 'Authentication failed')
		}
		await next()
	})
	.use(authRequiredRouter.routes())
	.use(authRequiredRouter.allowedMethods())
	.on('error', (err, ctx) => {
		console.error('server error', err)
		ctx.body = 'oops error'
	})


db
.connect()
.then(insertBasicData(db))
.then(() => {
	console.info('MongoDB connected')
	app.listen(port)
})
.catch((err) => {
	console.error('Could not connect to MongoDB database', err)
})


