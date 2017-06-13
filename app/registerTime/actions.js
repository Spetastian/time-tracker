export const FETCH_ENTRIES_CARD_REQUEST = 'FETCH_ENTRIES_CARD_REQUEST'
export const FETCH_ENTRIES_CARD_SUCCESS = 'FETCH_ENTRIES_CARD_SUCCESS'

export const fetchEntriesRequest = ({ week, month, year }) =>
    ({ type: FETCH_ENTRIES_CARD_REQUEST, week, month, year })

export const fetchEntriesSuccess = entries =>
    ({ type: FETCH_ENTRIES_CARD_SUCCESS, entries })
    

export const CREATE_ENTRY_REQUEST = 'CREATE_ENTRY_REQUEST'
export const CREATE_ENTRY_SUCCESS = 'CREATE_ENTRY_SUCCESS'

export const createEntryRequest = ({ projectId, week, startDay, endDay, month, year }) =>
    ({ type: CREATE_ENTRY_REQUEST, projectId, week, startDay, endDay, month, year })

export const createEntrySuccess = entries =>
    ({ type: CREATE_ENTRY_SUCCESS, entries })


export const SAVE_ENTRY_REQUEST = 'SAVE_ENTRY_REQUEST'
export const SAVE_ENTRY_SUCCESS = 'SAVE_ENTRY_SUCCESS'

export const saveEntryRequest = ({ week, year, month, id }) =>
    ({ type: SAVE_ENTRY_REQUEST, week, year, month, id })

export const saveEntrySuccess = entries =>
    ({ type: SAVE_ENTRY_SUCCESS, entries })


export const REMOVE_ENTRY_REQUEST = 'REMOVE_ENTRY_REQUEST'
export const REMOVE_ENTRY_SUCCESS = 'REMOVE_ENTRY_SUCCESS'

export const removeEntryRequest = id =>
    ({ type: REMOVE_ENTRY_REQUEST, id })

export const removeEntrySuccess = entries =>
    ({ type: REMOVE_ENTRY_SUCCESS, entries })