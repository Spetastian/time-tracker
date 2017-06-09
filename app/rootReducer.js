import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { registerTimeReducer } from './registerTime'
import { authReducer } from './common/auth'
import { usersReducer } from './users'
import { projectsReducer } from './projects'
import { errorsReducer } from './common/errors'

const rootReducer = combineReducers({
	auth: authReducer,
	registerTime: registerTimeReducer,
	routing: routerReducer,
	errors: errorsReducer,
	users: usersReducer,
	projects: projectsReducer
})

export default rootReducer