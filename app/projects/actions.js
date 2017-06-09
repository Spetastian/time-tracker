export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST'
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'

export const fetchProjectsRequest = () =>
	({ type: FETCH_PROJECTS_REQUEST })

export const fetchProjectsSuccess = projects =>
	({ type: FETCH_PROJECTS_SUCCESS, projects })