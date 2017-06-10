import {
		FETCH_USERS_REQUEST,
		FETCH_USERS_SUCCESS,
		CREATE_USER_REQUEST,
		CREATE_USER_SUCCESS,
		REMOVE_USER_REQUEST,
		REMOVE_USER_SUCCESS,
		UPDATE_USER_REQUEST,
		UPDATE_USER_SUCCESS
} from './actions'


const initialState = {
	users: [],
	loading: false
}

export default function usersReducer(state = initialState, action) {
	switch (action.type) {

		case FETCH_USERS_REQUEST:
		case CREATE_USER_REQUEST:
		case REMOVE_USER_REQUEST:
		case UPDATE_USER_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case FETCH_USERS_SUCCESS:
		case CREATE_USER_SUCCESS:
		case REMOVE_USER_SUCCESS:
		case UPDATE_USER_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				users: action.users
			})
        
		default:
			return state
	}
}