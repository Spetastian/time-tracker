import {
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS
} from './actions'

const initialState = {
	loading: false,
	authenticated: false
}

export default function campaignReducer(state = initialState, action) {
	switch (action.type) {
		case AUTHENTICATION_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case AUTHENTICATION_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				authenticated: true
			})
			
		default:
			return state
	}
}