import { combineEpics } from 'redux-observable'
import { registerTimeEpics } from './registerTime'
import { authEpics } from './common/auth'
import { usersEpics } from './users'
import { projectsEpics } from './projects'

export default combineEpics(
    registerTimeEpics,
    authEpics,
		usersEpics,
		projectsEpics
)