import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
		VERIFY_AUTHENTICATION_SUCCESS,
		VERIFY_AUTHENTICATION_FAILURE
} from './actions'

const initialState = {
	companyName: null,
	email: null,
	firstname: null,
	lastname: null,
	projects: [],
	loading: false,
	authenticated: false
}

export default function campaignReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_IN_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case SIGN_IN_SUCCESS:
			return Object.assign({}, state, {
				companyName: action.companyName,
				email: action.email,
				firstname: action.firstname,
				lastname: action.lastname,
				projects: action.projects || [],
				loading: false,
				authenticated: true
			})

		case VERIFY_AUTHENTICATION_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				authenticated: true
			})

		case VERIFY_AUTHENTICATION_FAILURE:
			return Object.assign({}, state, {
				loading: false,
				authenticated: false
			})
			
		default:
			return state
	}
}