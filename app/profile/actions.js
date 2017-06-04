export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST'
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS'
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE'

export const fetchProfileRequest = () =>
    ({ type: FETCH_PROFILE_REQUEST })

export const fetchProfileSuccess = profile =>
    ({ type: FETCH_PROFILE_SUCCESS, profile })

export const fetchProfiledFailure = error =>
    ({ type: FETCH_PROFILE_FAILURE, error })