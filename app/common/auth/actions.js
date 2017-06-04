
export const VERIFY_AUTHENTICATION = 'VERIFY_AUTHENTICATION'
export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST'
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE'

export const verifyAuthentication = () =>
    ({ type: VERIFY_AUTHENTICATION })

export const authenticationRequest = () =>
    ({ type: AUTHENTICATION_REQUEST })

export const authenticationSuccess = () =>
    ({ type: AUTHENTICATION_SUCCESS })

export const authenticationFailure = error =>
    ({ type: AUTHENTICATION_FAILURE, error })


export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'

export const signInRequest = ({ username, password }) =>
    ({ type: SIGN_IN_REQUEST, username, password })

export const signInSuccess = () =>
    ({ type: SIGN_IN_SUCCESS })

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
