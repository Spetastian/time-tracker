export const REQUEST_ERROR = 'REQUEST_ERROR'

export const requestError = ({ message, url }) =>
	({ type: REQUEST_ERROR, message, url })