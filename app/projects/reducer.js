import {
		FETCH_PROJECTS_REQUEST,
		FETCH_PROJECTS_SUCCESS
} from './actions'


const initialState = {
	projects: [],
	loading: false
}

export default function projectsReducer(state = initialState, action) {
	switch (action.type) {

		case FETCH_PROJECTS_REQUEST:
			return Object.assign({}, state, {
				loading: true
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