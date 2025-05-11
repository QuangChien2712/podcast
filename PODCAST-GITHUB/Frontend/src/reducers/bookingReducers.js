import {
    ALL_BOOKINGS_REQUEST,
    ALL_BOOKINGS_SUCCESS,
    ALL_BOOKINGS_FAIL,
    ADMIN_BOOKINGS_REQUEST,
    ADMIN_BOOKINGS_SUCCESS,
    ADMIN_BOOKINGS_FAIL,
    NEW_BOOKING_REQUEST,
    NEW_BOOKING_SUCCESS,
    NEW_BOOKING_RESET,
    NEW_BOOKING_FAIL,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_RESET,
    DELETE_BOOKING_FAIL,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_SUCCESS,
    UPDATE_BOOKING_RESET,
    UPDATE_BOOKING_FAIL,
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
    
    ALL_BOOKINGS_REQUESTPTSN,
    ADMIN_BOOKINGS_REQUESTPTSN,
    ALL_BOOKINGS_SUCCESSPTSN,
    ADMIN_BOOKINGS_SUCCESSPTSN,
    ALL_BOOKINGS_FAILPTSN,
    ADMIN_BOOKINGS_FAILPTSN,
    CLEAR_ERRORSPTSN,

    BOOKING_DETAILS_REQUESTPTSN,
    BOOKING_DETAILS_SUCCESSPTSN,
    BOOKING_DETAILS_FAILPTSN,

    SEARCH_BOOKINGS_PTSN,

    NEW_DISCUSSIONCONTENT_REQUEST,
    NEW_DISCUSSIONCONTENT_SUCCESS,
    NEW_DISCUSSIONCONTENT_RESET,
    NEW_DISCUSSIONCONTENT_FAIL,

    ADMIN_DISCUSSIONCONTENTS_REQUEST,
    ADMIN_DISCUSSIONCONTENTS_SUCCESS,
    ADMIN_DISCUSSIONCONTENTS_FAIL,

    DELETE_DISCUSSIONCONTENT_REQUEST,
    DELETE_DISCUSSIONCONTENT_SUCCESS,
    DELETE_DISCUSSIONCONTENT_RESET,
    DELETE_DISCUSSIONCONTENT_FAIL,

    UPDATE_DISCUSSIONCONTENT_REQUEST,
    UPDATE_DISCUSSIONCONTENT_SUCCESS,
    UPDATE_DISCUSSIONCONTENT_RESET,
    UPDATE_DISCUSSIONCONTENT_FAIL,

    NEW_DISCUSSIONTIME_REQUEST,
    NEW_DISCUSSIONTIME_SUCCESS,
    NEW_DISCUSSIONTIME_RESET,
    NEW_DISCUSSIONTIME_FAIL,

    ADMIN_DISCUSSIONTIMES_REQUEST,
    ADMIN_DISCUSSIONTIMES_SUCCESS,
    ADMIN_DISCUSSIONTIMES_FAIL,

    DELETE_DISCUSSIONTIME_REQUEST,
    DELETE_DISCUSSIONTIME_SUCCESS,
    DELETE_DISCUSSIONTIME_RESET,
    DELETE_DISCUSSIONTIME_FAIL,
    
    UPDATE_DISCUSSIONTIME_REQUEST,
    UPDATE_DISCUSSIONTIME_SUCCESS,
    UPDATE_DISCUSSIONTIME_RESET,
    UPDATE_DISCUSSIONTIME_FAIL,

} from '../constants/bookingConstants'

export const bookingsReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case ALL_BOOKINGS_REQUEST:
        case ADMIN_BOOKINGS_REQUEST:
            return {
                loading: true,
                bookings: []
            }

        case ALL_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload.bookings,
                bookingsCount: action.payload.bookingsCount,
                resPerPage: action.payload.resPerPage,
                filteredBookingsCount: action.payload.filteredBookingsCount
            }

        case ADMIN_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }

        case ALL_BOOKINGS_FAIL:
        case ADMIN_BOOKINGS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const bookingsReducerPTSN = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case ALL_BOOKINGS_REQUESTPTSN:
        case ADMIN_BOOKINGS_REQUESTPTSN:
            return {
                loading: true,
                bookings: []
            }

        case ALL_BOOKINGS_SUCCESSPTSN:
            return {
                loading: false,
                bookings: action.payload.bookings,
                bookingsCount: action.payload.bookingsCount,
                resPerPage: action.payload.resPerPage,
                filteredBookingsCount: action.payload.filteredBookingsCount
            }

        case ADMIN_BOOKINGS_SUCCESSPTSN:
            return {
                loading: false,
                bookings: action.payload
            }

        case ALL_BOOKINGS_FAILPTSN:
        case ADMIN_BOOKINGS_FAILPTSN:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORSPTSN:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newBookingReducer = (state = { booking: {} }, action) => {
    switch (action.type) {

        case NEW_BOOKING_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_BOOKING_SUCCESS:
            return {
                loading: false,
                success: true,
                booking: action.payload
            }

        case NEW_BOOKING_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_BOOKING_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const bookingReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_BOOKING_REQUEST:
        case UPDATE_BOOKING_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true
            }

        case UPDATE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            }


        case DELETE_BOOKING_FAIL:
        case UPDATE_BOOKING_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_BOOKING_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_BOOKING_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const bookingDetailsReducer = (state = { bookings: {} }, action) => {
    switch (action.type) {

        case BOOKING_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case BOOKING_DETAILS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }

        case BOOKING_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const bookingDetailsReducerPTSN = (state = { booking: {} }, action) => {
    switch (action.type) {

        case BOOKING_DETAILS_REQUESTPTSN:
            return {
                ...state,
                loading: true
            }

        case BOOKING_DETAILS_SUCCESSPTSN:
            return {
                loading: false,
                booking: action.payload
            }

        case BOOKING_DETAILS_FAILPTSN:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORSPTSN:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const searchBookingsPTSN = (state = { bookingsSPTSN: [] }, action) => {
    switch (action.type) {
       
        case SEARCH_BOOKINGS_PTSN:
            return {
                bookingsSPTSN: action.payload
            }

        default:
            return state;
    }
}

export const newDiscussionContentReducer = (state = { discussioncontent: {} }, action) => {
    switch (action.type) {

        case NEW_DISCUSSIONCONTENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_DISCUSSIONCONTENT_SUCCESS:
            return {
                loading: false,
                success: true,
                discussioncontent: action.payload
            }

        case NEW_DISCUSSIONCONTENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_DISCUSSIONCONTENT_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const discussioncontentsReducer = (state = { discussioncontents: [] }, action) => {
    switch (action.type) {
        case ADMIN_DISCUSSIONCONTENTS_REQUEST:
            return {
                loading: true,
                discussioncontents: []
            }

        case ADMIN_DISCUSSIONCONTENTS_SUCCESS:
            return {
                loading: false,
                discussioncontents: action.payload
            }

        case ADMIN_DISCUSSIONCONTENTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const discussioncontentReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_DISCUSSIONCONTENT_REQUEST:
        case UPDATE_DISCUSSIONCONTENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_DISCUSSIONCONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true
            }

        case UPDATE_DISCUSSIONCONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            }


        case DELETE_DISCUSSIONCONTENT_FAIL:
        case UPDATE_DISCUSSIONCONTENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_DISCUSSIONCONTENT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_DISCUSSIONCONTENT_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}



export const newDiscussionTimeReducer = (state = { discussiontime: {} }, action) => {
    switch (action.type) {

        case NEW_DISCUSSIONTIME_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_DISCUSSIONTIME_SUCCESS:
            return {
                loading: false,
                successT: true,
                discussiontime: action.payload
            }

        case NEW_DISCUSSIONTIME_FAIL:
            return {
                ...state,
                errorT: action.payload
            }

        case NEW_DISCUSSIONTIME_RESET:
            return {
                ...state,
                successT: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errorT: null
            }

        default:
            return state
    }
}


export const discussiontimesReducer = (state = { discussiontimes: [] }, action) => {
    switch (action.type) {
        case ADMIN_DISCUSSIONTIMES_REQUEST:
            return {
                loading: true,
                discussiontimes: []
            }

        case ADMIN_DISCUSSIONTIMES_SUCCESS:
            return {
                loading: false,
                discussiontimes: action.payload
            }

        case ADMIN_DISCUSSIONTIMES_FAIL:
            return {
                loading: false,
                errorT: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errorT: null
            }

        default:
            return state;
    }
}


export const discussiontimeReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_DISCUSSIONTIME_REQUEST:
        case UPDATE_DISCUSSIONTIME_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_DISCUSSIONTIME_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeletedT: true
            }

        case UPDATE_DISCUSSIONTIME_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdatedT: true
            }


        case DELETE_DISCUSSIONTIME_FAIL:
        case UPDATE_DISCUSSIONTIME_FAIL:
            return {
                ...state,
                errorT: action.payload
            }

        case DELETE_DISCUSSIONTIME_RESET:
            return {
                ...state,
                isDeletedT: false
            }

        case UPDATE_DISCUSSIONTIME_RESET:
            return {
                ...state,
                isUpdatedT: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errorT: null
            }

        default:
            return state
    }
}