export const FETCH_TIME_CARD_REQUEST = 'FETCH_TIME_CARD_REQUEST'
export const FETCH_TIME_CARD_SUCCESS = 'FETCH_TIME_CARD_SUCCESS'

export const fetchTimeCardRequest = ({ weekNumber }) =>
    ({ type: FETCH_TIME_CARD_REQUEST, weekNumber })

export const fetchTimeCardSuccess = entries =>
    ({ type: FETCH_TIME_CARD_SUCCESS, entries })
    

export const ADD_NEW_ENTRY_REQUEST = 'ADD_NEW_ENTRY_REQUEST'
export const ADD_NEW_ENTRY_SUCCESS = 'ADD_NEW_ENTRY_SUCCESS'

export const addNewEntryRequest = ({ weekNumber, projectId }) =>
    ({ type: ADD_NEW_ENTRY_REQUEST, weekNumber, projectId })

export const addNewEntrySuccess = entries =>
    ({ type: ADD_NEW_ENTRY_SUCCESS, entries })