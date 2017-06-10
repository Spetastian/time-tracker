export const FETCH_WEEK_CARD_REQUEST = 'FETCH_WEEK_CARD_REQUEST'
export const FETCH_WEEK_CARD_SUCCESS = 'FETCH_WEEK_CARD_SUCCESS'

export const fetchWeekRequest = ({ weekNumber }) =>
    ({ type: FETCH_WEEK_CARD_REQUEST, weekNumber })

export const fetchWeekSuccess = entries =>
    ({ type: FETCH_WEEK_CARD_SUCCESS, entries })
    

export const CREATE_ENTRY_REQUEST = 'CREATE_ENTRY_REQUEST'
export const CREATE_ENTRY_SUCCESS = 'CREATE_ENTRY_SUCCESS'

export const createEntryRequest = ({ weekNumber, projectId }) =>
    ({ type: CREATE_ENTRY_REQUEST, weekNumber, projectId })

export const createEntrySuccess = entries =>
    ({ type: CREATE_ENTRY_SUCCESS, entries })


export const SAVE_ENTRY_REQUEST = 'SAVE_ENTRY_REQUEST'
export const SAVE_ENTRY_SUCCESS = 'SAVE_ENTRY_SUCCESS'

export const saveEntryRequest = ({ weekNumber, id }) =>
    ({ type: SAVE_ENTRY_REQUEST, weekNumber, id })

export const saveEntrySuccess = entries =>
    ({ type: SAVE_ENTRY_SUCCESS, entries })


export const REMOVE_ENTRY_REQUEST = 'REMOVE_ENTRY_REQUEST'
export const REMOVE_ENTRY_SUCCESS = 'REMOVE_ENTRY_SUCCESS'

export const removeEntryRequest = ({ weekNumber, id }) =>
    ({ type: REMOVE_ENTRY_REQUEST, weekNumber, id })

export const removeEntrySuccess = entries =>
    ({ type: REMOVE_ENTRY_SUCCESS, entries })