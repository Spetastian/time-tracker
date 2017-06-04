import { REQUEST_ERROR } from './actions'

const initialState = {
	error: false,
	type: null,
	message: null,
	details: null
}

export default function errorsReducer(state = initialState, action) {
	switch (action.type) {
		case REQUEST_ERROR:
			return {
				error: true,
				type: action.type,
				message: 'Something went wrong when fetching external data.',
				details: `Error message: "${action.message}" at ${action.url}.`
			}
		default:
			return state
	}
}