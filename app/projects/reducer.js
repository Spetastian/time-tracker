import {
		FETCH_PROJECTS_REQUEST,
		FETCH_PROJECTS_SUCCESS,
		CREATE_PROJECT_REQUEST,
		CREATE_PROJECT_SUCCESS,
		REMOVE_PROJECT_REQUEST,
		REMOVE_PROJECT_SUCCESS,
		UPDATE_PROJECT_REQUEST,
		UPDATE_PROJECT_SUCCESS
} from './actions'


const initialState = {
	projects: [],
	loading: false
}

export default function projectsReducer(state = initialState, action) {
	switch (action.type) {

		case FETCH_PROJECTS_REQUEST:
		case CREATE_PROJECT_REQUEST:
		case REMOVE_PROJECT_REQUEST:
		case UPDATE_PROJECT_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case FETCH_PROJECTS_SUCCESS:
		case CREATE_PROJECT_SUCCESS:
		case REMOVE_PROJECT_SUCCESS:
		case UPDATE_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projects: action.projects
			})
        
		default:
			return state
	}
}