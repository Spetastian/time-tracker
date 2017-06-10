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