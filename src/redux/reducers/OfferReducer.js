import {
    FETCHING_OFFER_REQUEST,
    FETCHING_OFFER_SUCCESS,
    FETCTHING_OFFER_FAILURE,
    FETCHING_LOGIN_REQUEST,
    FETCHING_LOGIN_SUCCESS,
    FETCHING_LOGIN_FAILURE,
    FETCHING_LOGIN_ERROR,
    FETCHING_SIGNUP_REQUEST,
    FETCHING_SIGNUP_SUCCESS,
    FETCHING_SIGNUP_FAILURE,
    FETCHING_CATEGORY_REQUEST,
    FETCHING_CATEGORY_SUCCESS,
    FETCHING_CATEGORY_FAILURE,
    FETCHING_OFFERBYCATEGORY_REQUEST,
    FETCHING_OFFERBYCATEGORY_SUCCESS,
    FETCHING_OFFERBYCATEGORY_FAILURE,
    FETCHING_SEARCH_REQUEST,
    FETCHING_SEARCH_SUCCESS,
    FETCHING_SEARCH_FAILURE,
    FETCHING_ADD_HISTORY,
    FETCHING_GET_HISTORY,
    FETCHING_RESET_HISTORY,
    FETCHING_QRCODE_SUCCESS,
    FETCHING_QRCODE_FAILURE,
    POSTING_OFFER_TO_USER_SUCCESS,
    POSTING_OFFER_TO_USER_FAILURE,
    POSTING_OFFER_TO_USER_PENDING,
    FETCHING_AVAILABLE_OFFERS_TO_USER_SUCCESS,
    FETCHING_AVAILABLE_OFFERS_TO_USER_FAILURE,
    FETCHING_AVAILABLE_STORE_SUCCESS,
    FETCHING_AVAILABLE_STORE_FAILURE,
    FETCHING_ALL_STORE_SUCCESS,
    FETCHING_ALL_STORE_FAILURE,
    POSTING_USER_LOCATION_SUCCESS,
    POSTING_USER_LOCATION_FAILURE,
    POSTING_USER_LOCATION_PENDING
} from '../actions/types';
import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
const initialState = {
    isFetching: false,
    isPosting: false,
    errorMessage: '',
    errorAlertMessage: '',
    isloginFetching: false,
    issignupFetching: false,
    isloadingbycategory: false,
    isQRCodeFetching: false,
    qr_code: {},
    offer: [],
    category: [],
    history: [],
    available_offers: [],
    redeemed_offers: []
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
        case FETCHING_CATEGORY_FAILURE:
            state = Object.assign({}, state, { isFetching: false, errorMessage: action.payload })
            return state;
        case FETCHING_CATEGORY_SUCCESS:
            state = Object.assign({}, state, { isFetching: false, category: action.payload });
            return state;
        case FETCHING_LOGIN_ERROR:
            state = Object.assign({}, state, { isloginFetching: false, errorAlertMessage: action.payload });
            return state;
        case FETCHING_LOGIN_REQUEST:
            state = Object.assign({}, state, { isloginFetching: true })
            return state;
        case FETCHING_LOGIN_FAILURE:
            state = Object.assign({}, state, { isloginFetching: false, errorMessag: action.payload })
            return state;
        case FETCHING_LOGIN_SUCCESS:
            AsyncStorage.setItem('token', action.payload.token);
            AsyncStorage.setItem('user_id', action.payload.id);
            state = Object.assign({}, state, { isloginFetching: false });
            return state;
        case FETCHING_SIGNUP_REQUEST:
            state = Object.assign({}, state, { issignupFetching: true })
            return state;
        case FETCHING_SIGNUP_FAILURE:
            state = Object.assign({}, state, { issignupFetching: false, errorMessag: action.payload })
            return state;
        case FETCHING_SIGNUP_SUCCESS:
            state = Object.assign({}, state, { issignupFetching: false, isloginFetching: false });
            return state;
        case FETCHING_ADD_HISTORY:
            state = Object.assign({}, state, { history: action.payload })
            return state;
        case FETCHING_GET_HISTORY:
            state = Object.assign({}, state, { history: action.payload })
            return state;
        case FETCHING_RESET_HISTORY:
            state = Object.assign({}, state, { history: action.payload })
            state = Object.assign({}, state, { issignupFetching: false, isloginFetching: false });
            return state;
        case FETCHING_QRCODE_SUCCESS:
            state = Object.assign({}, state, { isQRCodeFetching: false, qr_code: action.payload });
            return state;
        case FETCHING_QRCODE_FAILURE:
            state = Object.assign({}, state, { isQRCodeFetching: false, errorMessage: action.payload });
            return state;
        case POSTING_OFFER_TO_USER_SUCCESS:
            state = Object.assign({}, state, { isFetching: false });
            return state;
        case POSTING_OFFER_TO_USER_FAILURE:
            state = Object.assign({}, state, { isFetching: false });
            return state;
        case POSTING_OFFER_TO_USER_PENDING:
            state = Object.assign({}, state, { isFetching: true });
            return state;
        case FETCHING_AVAILABLE_OFFERS_TO_USER_SUCCESS:
            let available_offers = action.payload.filter((offer) => offer.redeemed === false);
            let redeemed_offers = action.payload.filter((offer) => offer.redeemed === true);
            state = Object.assign({}, state, { available_offers: available_offers, redeemed_offers: redeemed_offers });
            return state;
        case FETCHING_AVAILABLE_OFFERS_TO_USER_FAILURE:
            state = Object.assign({}, state, { errorMessage: action.payload });
            return state;
        case FETCHING_AVAILABLE_STORE_SUCCESS:
            state = Object.assign({}, state, { available_store: action.payload });
            return state;
        case FETCHING_AVAILABLE_STORE_FAILURE:
            state = Object.assign({}, state, { errorMessage: action.payload });
            return state;
        case FETCHING_ALL_STORE_SUCCESS:
            state = Object.assign({}, state, { all_stores: action.payload });
            return state;
        case FETCHING_ALL_STORE_FAILURE:
            state = Object.assign({}, state, { errorMessage: action.payload });
            return state;
        case POSTING_USER_LOCATION_SUCCESS: 
            state = Object.assign({}, state, { isPosting: false });
            return state;
        case POSTING_USER_LOCATION_FAILURE: 
            state = Object.assign({}, state, { isPosting: false, errorMessage: action.payload });
            return state;
        case POSTING_USER_LOCATION_PENDING: 
            state = Object.assign({}, state, { isPosting: true });
            return state;
        default:
            return state;
    }
};
const rootReducer = combineReducers({ OfferReducer });

export default rootReducer;