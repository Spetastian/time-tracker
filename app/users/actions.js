export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'

export const fetchUsersRequest = () =>
	({ type: FETCH_USERS_REQUEST })

export const fetchUsersSuccess = users =>
	({ type: FETCH_USERS_SUCCESS, users })


export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'

export const createUserRequest = ({ username, password, email, firstname, lastname, role }) =>
	({ type: CREATE_USER_REQUEST, username, password, email, firstname, lastname, role })

export const createUserSuccess = users =>
	({ type: CREATE_USER_SUCCESS, users })


export const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST'
export const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS'

export const removeUserRequest = id =>
	({ type: REMOVE_USER_REQUEST, id })

export const removeUserSuccess = users =>
	({ type: REMOVE_USER_SUCCESS, users })


export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'

export const updateUserRequest = ({ id, username, email, firstname, lastname, role }) =>
	({ type: UPDATE_USER_REQUEST, id, username, email, firstname, lastname, role })

export const updateUserSuccess = users =>
	({ type: UPDATE_USER_SUCCESS, users })