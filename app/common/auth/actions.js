
export const VERIFY_AUTHENTICATION = 'VERIFY_AUTHENTICATION'
export const VERIFY_AUTHENTICATION_SUCCESS = 'VERIFY_AUTHENTICATION_SUCCESS'

export const verifyAuthentication = () =>
    ({ type: VERIFY_AUTHENTICATION })

export const verifyAuthenticationSuccess = () =>
    ({ type: VERIFY_AUTHENTICATION_SUCCESS })


export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'

export const signInRequest = ({ username, password }) =>
    ({ type: SIGN_IN_REQUEST, username, password })

export const signInSuccess = ({ companyName, email, firstname, lastname, projects }) =>
    ({ type: SIGN_IN_SUCCESS, companyName, email, firstname, lastname, projects })

export const signInFailure = error =>
    ({ type: SIGN_IN_FAILURE, error })


export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE'

export const signOutRequest = () =>
    ({ type: SIGN_OUT_REQUEST })

export const signOutSuccess = () =>
    ({ type: SIGN_OUT_SUCCESS })

export const signOutFailure = error =>
    ({ type: SIGN_OUT_FAILURE, error })
