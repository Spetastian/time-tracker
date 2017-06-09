import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
		FETCH_PROJECTS_REQUEST,
		FETCH_PROJECTS_SUCCESS
} from './actions'


const initialState = {
	users: [],
	projects: [],
	loading: false
}

export default function usersReducer(state = initialState, action) {
	switch (action.type) {

		case FETCH_USERS_REQUEST:
		case FETCH_PROJECTS_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case FETCH_USERS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				users: action.users
			})

		case FETCH_PROJECTS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projects: action.projects
			})
        
		default:
			return state
	}
}