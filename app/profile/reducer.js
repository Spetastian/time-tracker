import {
    FETCH_USER_INFO_REQUEST,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_FAILURE
} from './actions'

const initialState = {
	userInfo: null,
	loading: false
}

export default function campaignReducer(state = initialState, action) {
	switch (action.type) {

		case FETCH_USER_INFO_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case FETCH_USER_INFO_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				userInfo: action.user
			})
        
		case FETCH_USER_INFO_FAILURE:
		default:
			return state
	}
}