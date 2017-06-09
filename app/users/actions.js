export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'

export const fetchUsersRequest = () =>
	({ type: FETCH_USERS_REQUEST })

export const fetchUsersSuccess = users =>
	({ type: FETCH_USERS_SUCCESS, users })