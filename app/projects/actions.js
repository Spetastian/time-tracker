export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST'
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'

export const fetchProjectsRequest = () =>
	({ type: FETCH_PROJECTS_REQUEST })

export const fetchProjectsSuccess = projects =>
	({ type: FETCH_PROJECTS_SUCCESS, projects })


export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST'
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS'

export const createProjectRequest = name =>
	({ type: CREATE_PROJECT_REQUEST, name })

export const createProjectSuccess = projects =>
	({ type: CREATE_PROJECT_SUCCESS, projects })


export const REMOVE_PROJECT_REQUEST = 'REMOVE_PROJECT_REQUEST'
export const REMOVE_PROJECT_SUCCESS = 'REMOVE_PROJECT_SUCCESS'

export const removeProjectRequest = id =>
	({ type: REMOVE_PROJECT_REQUEST, id })

export const removeProjectSuccess = projects =>
	({ type: REMOVE_PROJECT_SUCCESS, projects })


export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST'
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS'

export const updateProjectRequest = ({ id, name }) =>
	({ type: UPDATE_PROJECT_REQUEST, id, name })

export const updateProjectSuccess = projects =>
	({ type: UPDATE_PROJECT_SUCCESS, projects })