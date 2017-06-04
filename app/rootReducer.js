import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { registerTimeReducer } from './registerTime'
import { authReducer } from './common/auth'
import { errorsReducer } from './common/errors'

const rootReducer = combineReducers({
	auth: authReducer,
	registerTime: registerTimeReducer,
	routing: routerReducer,
	errors: errorsReducer
})

export default rootReducer