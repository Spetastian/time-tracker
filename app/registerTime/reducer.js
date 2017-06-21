import {
	FETCH_ENTRIES_REQUEST,
	FETCH_ENTRIES_SUCCESS,
	CREATE_ENTRY_REQUEST,
	CREATE_ENTRY_SUCCESS,
	REMOVE_ENTRY_REQUEST,
	REMOVE_ENTRY_SUCCESS,
	SAVE_ENTRY_REQUEST,
	SAVE_ENTRY_SUCCESS
} from './actions'


const initialState = {
	entries: [],
	loading: false
}

export default function campaignReducer(state = initialState, action) {
	switch (action.type) {

		case FETCH_ENTRIES_REQUEST:
		case CREATE_ENTRY_REQUEST:
		case REMOVE_ENTRY_REQUEST:
		case SAVE_ENTRY_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case FETCH_ENTRIES_SUCCESS:
		case CREATE_ENTRY_SUCCESS:
		case REMOVE_ENTRY_SUCCESS:
		case SAVE_ENTRY_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				entries: action.entries
			})

		default:
			return state
	}
}