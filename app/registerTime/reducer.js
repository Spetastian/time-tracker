import {
    FETCH_WEEK_REQUEST,
    FETCH_WEEK_SUCCESS,
    CREATE_ENTRY_REQUEST,
    CREATE_ENTRY_SUCCESS
} from './actions'


const initialState = {
	entries: [],
	loading: false
}

export default function campaignReducer(state = initialState, action) {
	switch (action.type) {

		case FETCH_WEEK_REQUEST:
		case CREATE_ENTRY_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case FETCH_WEEK_SUCCESS:
		case CREATE_ENTRY_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				entries: action.entries
			})
        
		default:
			return state
	}
}