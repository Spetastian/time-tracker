import { combineEpics } from 'redux-observable'
import { profileEpics } from './profile'
import { registerTimeEpics } from './registerTime'
import { authEpics } from './common/auth'

export default combineEpics(
    profileEpics,
    registerTimeEpics,
    authEpics
)