import {
    FETCH_TIME_CARD_REQUEST,
    FETCH_TIME_CARD_SUCCESS,
    ADD_NEW_ENTRY_REQUEST,
    ADD_NEW_ENTRY_SUCCESS
} from './actions'


const initialState = {
	entries: [],
	loading: false
}

export default function campaignReducer(state = initialState, action) {
	switch (action.type) {

		case FETCH_TIME_CARD_REQUEST:
		case ADD_NEW_ENTRY_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})

		case FETCH_TIME_CARD_SUCCESS:
		case ADD_NEW_ENTRY_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				entries: action.entries
			})
        
		default:
			return state
	}
}