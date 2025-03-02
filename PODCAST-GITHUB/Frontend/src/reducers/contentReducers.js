import {
    ALL_CONTENTS_REQUEST,
    ALL_CONTENTS_SUCCESS,
    ALL_CONTENTS_FAIL,
    ADMIN_CONTENTS_REQUEST,
    ADMIN_CONTENTS_SUCCESS,
    ADMIN_CONTENTS_FAIL,
    NEW_CONTENT_REQUEST,
    NEW_CONTENT_SUCCESS,
    NEW_CONTENT_RESET,
    NEW_CONTENT_FAIL,
    DELETE_CONTENT_REQUEST,
    DELETE_CONTENT_SUCCESS,
    DELETE_CONTENT_RESET,
    DELETE_CONTENT_FAIL,
    UPDATE_CONTENT_REQUEST,
    UPDATE_CONTENT_SUCCESS,
    UPDATE_CONTENT_RESET,
    UPDATE_CONTENT_FAIL,
    CONTENT_DETAILS_REQUEST,
    CONTENT_DETAILS_SUCCESS,
    CONTENT_DETAILS_FAIL,
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
    
    ALL_CONTENTS_REQUESTPTSN,
    ADMIN_CONTENTS_REQUESTPTSN,
    ALL_CONTENTS_SUCCESSPTSN,
    ADMIN_CONTENTS_SUCCESSPTSN,
    ALL_CONTENTS_FAILPTSN,
    ADMIN_CONTENTS_FAILPTSN,
    CLEAR_ERRORSPTSN,

    CONTENT_DETAILS_REQUESTPTSN,
    CONTENT_DETAILS_SUCCESSPTSN,
    CONTENT_DETAILS_FAILPTSN,

    SEARCH_CONTENTS_PTSN

} from '../constants/contentConstants'

export const contentsReducer = (state = { contents: [] }, action) => {
    switch (action.type) {
        case ALL_CONTENTS_REQUEST:
        case ADMIN_CONTENTS_REQUEST:
            return {
                loading: true,
                contents: []
            }

        case ALL_CONTENTS_SUCCESS:
            return {
                loading: false,
                contents: action.payload.contents,
                contentsCount: action.payload.contentsCount,
                resPerPage: action.payload.resPerPage,
                filteredContentsCount: action.payload.filteredContentsCount
            }

        case ADMIN_CONTENTS_SUCCESS:
            return {
                loading: false,
                contents: action.payload
            }

        case ALL_CONTENTS_FAIL:
        case ADMIN_CONTENTS_FAIL:
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

export const contentsReducerPTSN = (state = { contents: [] }, action) => {
    switch (action.type) {
        case ALL_CONTENTS_REQUESTPTSN:
        case ADMIN_CONTENTS_REQUESTPTSN:
            return {
                loading: true,
                contents: []
            }

        case ALL_CONTENTS_SUCCESSPTSN:
            return {
                loading: false,
                contents: action.payload.contents,
                contentsCount: action.payload.contentsCount,
                resPerPage: action.payload.resPerPage,
                filteredContentsCount: action.payload.filteredContentsCount
            }

        case ADMIN_CONTENTS_SUCCESSPTSN:
            return {
                loading: false,
                contents: action.payload
            }

        case ALL_CONTENTS_FAILPTSN:
        case ADMIN_CONTENTS_FAILPTSN:
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

export const newContentReducer = (state = { content: {} }, action) => {
    switch (action.type) {

        case NEW_CONTENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_CONTENT_SUCCESS:
            return {
                loading: false,
                success: true,
                content: action.payload
            }

        case NEW_CONTENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_CONTENT_RESET:
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

export const contentReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_CONTENT_REQUEST:
        case UPDATE_CONTENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_CONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_CONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_CONTENT_FAIL:
        case UPDATE_CONTENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_CONTENT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_CONTENT_RESET:
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

export const contentDetailsReducer = (state = { content: {} }, action) => {
    switch (action.type) {

        case CONTENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CONTENT_DETAILS_SUCCESS:
            return {
                loading: false,
                content: action.payload
            }

        case CONTENT_DETAILS_FAIL:
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


export const contentDetailsReducerPTSN = (state = { content: {} }, action) => {
    switch (action.type) {

        case CONTENT_DETAILS_REQUESTPTSN:
            return {
                ...state,
                loading: true
            }

        case CONTENT_DETAILS_SUCCESSPTSN:
            return {
                loading: false,
                content: action.payload
            }

        case CONTENT_DETAILS_FAILPTSN:
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

export const contentReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
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

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
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


export const searchContentsPTSN = (state = { contentsSPTSN: [] }, action) => {
    switch (action.type) {
       
        case SEARCH_CONTENTS_PTSN:
            return {
                contentsSPTSN: action.payload
            }

        default:
            return state;
    }
}