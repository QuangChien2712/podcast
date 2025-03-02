import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { contentsReducer, contentsReducerPTSN, newContentReducer, contentReducer, contentDetailsReducer, contentDetailsReducerPTSN, newReviewReducer, contentReviewsReducer, reviewReducer, searchContentsPTSN } from './reducers/contentReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers'

// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

// const persistCommonConfig = {
//     storage: storage,
//     stateReconciler: autoMergeLevel2,
// };

// const authPersistConfig = {
//     ...persistCommonConfig,
//     key: "user",
//     whitelist: ["isAuthenticated", "user"],
// };


const reducer = combineReducers({
    contents: contentsReducer,
    contentsPTSN: contentsReducerPTSN,
    contentDetails: contentDetailsReducer,
    contentDetailsPTSN: contentDetailsReducerPTSN,
    newContent: newContentReducer,
    content: contentReducer,
    contentReviews: contentReviewsReducer,
    review: reviewReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    newReview: newReviewReducer,

    contentsSPTSN: searchContentsPTSN,
})


let initialState = {
    
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;