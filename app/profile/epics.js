import { handleAjaxError } from '../utils/epicHelpers'
import {
    FETCH_PROFILE_REQUEST,
    fetchProfileSuccess
} from './actions'

import { combineEpics } from 'redux-observable'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'


const fetchProfileRequestEpic = action$ =>
    action$.ofType(FETCH_PROFILE_REQUEST)
        .map(() => fetchProfileSuccess({}))


export default combineEpics(fetchProfileRequestEpic)

