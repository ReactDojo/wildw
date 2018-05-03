import {
    FETCHING_OFFER_REQUEST,
    FETCHING_OFFER_SUCCESS,
    FETCTHING_OFFER_FAILURE,
    FETCHING_LOGIN_REQUEST,
    FETCHING_LOGIN_SUCCESS,
    FETCHING_LOGIN_FAILURE,
    FETCHING_SIGNUP_REQUEST,
    FETCHING_SIGNUP_SUCCESS,
    FETCHING_SIGNUP_FAILURE,
    FETCHING_CATEGORY_REQUEST,
    FETCHING_CATEGORY_SUCCESS,
    FECTHING_CATEGORY_FAILURE,
    FETCHING_OFFERBYCATEGORY_REQUEST,
    FETCHING_OFFERBYCATEGORY_SUCCESS,
    FETCHING_OFFERBYCATEGORY_FAILURE,
    FETCHING_SEARCH_REQUEST,
    FETCHING_SEARCH_SUCCESS,
    FETCHING_SEARCH_FAILURE,
<<<<<<< HEAD
    FETCHING_ADD_HISTORY,
    FETCHING_GET_HISTORY,
    FETCHING_RESET_HISTORY
=======
    FETCHING_QRCODE_SUCCESS,
    FETCHING_QRCODE_FAILURE,
    POSTING_OFFER_TO_USER_SUCCESS,
    POSTING_OFFER_TO_USER_FAILURE,
    FETCHING_AVAILABLE_OFFERS_TO_USER_SUCCESS,
    FETCHING_AVAILABLE_OFFERS_TO_USER_FAILURE
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
} from '../actions/types';
import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
const initialState = {
    isFetching: false,
    errorMessage: '',
    isloginFetching: false,
    issignupFetching: false,
    isloadingbycategory: false,
    isQRCodeFetching: false,
    qr_code: {},
    offer: [],
<<<<<<< HEAD
    category:[],
    history:[],
=======
    available_offers: [],
    category: []
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
};
import { Actions } from 'react-native-router-flux';
const OfferReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_OFFER_REQUEST:
            state = Object.assign({}, state, { isFetching: true })
            return state;
        case FETCTHING_OFFER_FAILURE:
            state = Object.assign({}, state, { isFetching: false, errorMessag: action.payload })
            return state;
        case FETCHING_OFFER_SUCCESS:
            state = Object.assign({}, state, { isFetching: false, offer: action.payload });
            return state;
        case FETCHING_OFFERBYCATEGORY_REQUEST:
            state = Object.assign({}, state, { isFetching: true, isloadingbycategory: true })
            return state;
        case FETCHING_OFFERBYCATEGORY_FAILURE:
            state = Object.assign({}, state, { isFetching: false, errorMessag: action.payload })
            return state;
        case FETCHING_OFFERBYCATEGORY_SUCCESS:
            state = Object.assign({}, state, { isFetching: false, offer: action.payload });
            return state;
        case FETCHING_SEARCH_REQUEST:
            state = Object.assign({}, state, { isFetching: true, isloadingbycategory: true })
            return state;
        case FETCHING_SEARCH_FAILURE:
            state = Object.assign({}, state, { isFetching: false, errorMessag: action.payload })
            return state;
        case FETCHING_SEARCH_SUCCESS:
            state = Object.assign({}, state, { isFetching: false, offer: action.payload.result });
            return state;
        case FETCHING_CATEGORY_REQUEST:
            state = Object.assign({}, state, { isFetching: true })
            return state;
<<<<<<< HEAD
        case FECTHING_CATEGORY_FAILURE:
            state = Object.assign({}, state, {isFetching: false, errorMessag:action.payload}) 
=======
        case FETCHING_CATEGORY_FAILURE:
            state = Object.assign({}, state, { isFetching: false, errorMessag: action.payload })
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
            return state;
        case FETCHING_CATEGORY_SUCCESS:
            state = Object.assign({}, state, { isFetching: false, category: action.payload });
            return state;
        case FETCHING_LOGIN_REQUEST:
            state = Object.assign({}, state, { isloginFetching: true })
            return state;
        case FETCHING_LOGIN_FAILURE:
            state = Object.assign({}, state, { isloginFetching: false, errorMessag: action.payload })
            return state;
        case FETCHING_LOGIN_SUCCESS:
            AsyncStorage.setItem('token', action.payload.token);
<<<<<<< HEAD
            state = Object.assign({}, state, {isloginFetching: false});
=======
            AsyncStorage.setItem('user_id', action.payload.id);
            state = Object.assign({}, state, { isloginFetching: false });
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
            return state;
        case FETCHING_SIGNUP_REQUEST:
            state = Object.assign({}, state, { issignupFetching: true })
            return state;
        case FETCHING_SIGNUP_FAILURE:
            state = Object.assign({}, state, { issignupFetching: false, errorMessag: action.payload })
            return state;
        case FETCHING_SIGNUP_SUCCESS:
<<<<<<< HEAD
            state = Object.assign({}, state, {issignupFetching: false,isloginFetching: false});
            return state;
        case FETCHING_ADD_HISTORY:
            state = Object.assign({}, state, { history:action.payload })
        case FETCHING_GET_HISTORY:
            state = Object.assign({}, state, { history: action.payload } )
        case FETCHING_RESET_HISTORY:
            state = Object.assign({}, state, { history: action.payload })        
=======
            state = Object.assign({}, state, { issignupFetching: false, isloginFetching: false });
            return state;
        case FETCHING_QRCODE_SUCCESS:
            console.log(state); 
            state = Object.assign({}, state, { isQRCodeFetching: false, qr_code: action.payload });
            return state;
        case FETCHING_QRCODE_FAILURE:
            state = Object.assign({}, state, { isQRCodeFetching: false, errorMessage: action.payload });
            return state;
        case POSTING_OFFER_TO_USER_SUCCESS:
            return state;
        case POSTING_OFFER_TO_USER_FAILURE:
            return state;
        case FETCHING_AVAILABLE_OFFERS_TO_USER_SUCCESS:
            state = Object.assign({}, state, { available_offers: action.payload });
            return state;
        case FETCHING_AVAILABLE_OFFERS_TO_USER_FAILURE:
            state = Object.assign({}, state, { errorMessage: action.payload });
            return state;
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
        default:
            return state;
    }
};
const rootReducer = combineReducers({ OfferReducer });

export default rootReducer;