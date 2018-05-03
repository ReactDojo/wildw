import {
    FETCHING_OFFER_REQUEST,
    FETCHING_OFFER_SUCCESS,
    FECTHING_OFFER_FAILURE,
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
} from './types';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import store from '../store';
const REQUEST_URL = "https://offerbotapp.herokuapp.com";
// offer list
export const fetchingOfferRequest = () => ({ type: FETCHING_OFFER_REQUEST });
export const fetchingOfferSuccess = json => ({
    type: FETCHING_OFFER_SUCCESS,
    payload: json
});
export const fetchingOfferFailure = error => ({
    type: FECTHING_OFFER_FAILURE,
    payload: error
});
export const fetchOffer = () => {
    return async dispatch => {
        dispatch(fetchingOfferRequest());
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('mytoken:', value);
            let requestConfig = {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + value }
            };
            let url = REQUEST_URL + '/api/Offers';
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            dispatch(fetchingOfferSuccess(json));
        }
        catch (error) {
            dispatch(fetchingOfferFailure(error));
        }
    }
}
export const fetchingOfferByCategoryRequest = () => ({ type: FETCHING_OFFER_REQUEST });
export const fetchingOfferByCategorySuccess = json => ({
    type: FETCHING_OFFER_SUCCESS,
    payload: json
});
export const fetchingOfferByCategoryFailure = error => ({
    type: FECTHING_OFFER_FAILURE,
    payload: error
});
export const fetchOfferByCategory = (data) => {
    return async dispatch => {
        dispatch(fetchingOfferByCategoryRequest());
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('mytoken:', value);
            let requestConfig = {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + value }
            };
            let url = REQUEST_URL + '/api/Categories/' + data + '/offers';
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            dispatch(fetchingOfferByCategorySuccess(json));
        }
        catch (error) {
            dispatch(fetchingOfferByCategoryFailure(error));
        }
    }
}
export const fetchingSearchRequest = () => ({ type: FETCHING_SEARCH_REQUEST });
export const fetchingSearchSuccess = json => ({
    type: FETCHING_SEARCH_SUCCESS,
    payload: json
});
export const fetchingSearchFailure = error => ({
    type: FETCHING_SEARCH_FAILURE,
    payload: error
});
export const fetchSearch = (data) => {
    return async dispatch => {
        dispatch(fetchingSearchRequest());
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('mytoken:', value);
            let requestConfig = {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + value }
            };

            let url = REQUEST_URL + '/api/Offers/search/' + data;
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            dispatch(fetchingSearchSuccess(json));

        }
        catch (error) {
            dispatch(fetchingSearchFailure(error));
        }
    }
}
//get offer categories
export const fetchingCategoryRequest = () => ({ type: FETCHING_CATEGORY_REQUEST });
export const fetchingCategorySuccess = json => ({
    type: FETCHING_CATEGORY_SUCCESS,
    payload: json
});
export const fetchingCategoryFailure = error => ({
    type: FECTHING_CATEGORY_FAILURE,
    payload: error
});
export const fetchCategory = () => {
    return async dispatch => {
        dispatch(fetchingCategoryRequest());
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('mytoken:', value);
            let requestConfig = {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + value }
            };
            let url = REQUEST_URL + '/api/Categories';
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            dispatch(fetchingCategorySuccess(json));
        }
        catch (error) {
            dispatch(fetchingCategoryFailure(error));
        }
    }
}

//user login

export const fetchingLoginRequest = () => ({ type: FETCHING_LOGIN_REQUEST });
export const fetchingLoginSuccess = json => ({
    type: FETCHING_LOGIN_SUCCESS,
    payload: json
});
export const fetchingLoginFailure = error => ({
    type: FETCHING_LOGIN_FAILURE,
    payload: error
});
export const fetchLogin = (data) => {
    return async dispatch => {
        dispatch(fetchingLoginRequest());
        try {
            let requestConfig = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            let url = REQUEST_URL + '/login';
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            dispatch(fetchingLoginSuccess(json));
            dispatch(fetchOffer());
            dispatch(fetchCategory());
            dispatch(fetchUserQRCode());
            dispatch(fetchAvailableOffers());
            Actions.offerlist();
        }
        catch (error) {
            dispatch(fetchingLoginFailure(error));
        }
    }
}

//off user register
export const fetchingSignupRequest = () => ({ type: FETCHING_SIGNUP_REQUEST });
export const fetchingSignupSuccess = json => ({
    type: FETCHING_SIGNUP_SUCCESS,
    payload: json
});
export const fetchingSignupFailure = error => ({
    type: FETCHING_SIGNUP_FAILURE,
    payload: error
});
export const fetchSignup = (data) => {
    return async dispatch => {
        dispatch(fetchingLoginRequest());
        try {
            let requestConfig = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            let url = REQUEST_URL + '/signup';
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            dispatch(fetchingSignupSuccess(json));
            Actions.login();
        }
        catch (error) {
            dispatch(fetchingSignupFailure(error));
        }
    }
}
// history
export const fetchAddHistory = (data) => {
    return async  dispatch => {
        try{
            let json = {
                name: data
            };
            
            AsyncStorage.getItem('search', (err, keyword) => {
                let histories = [];
                if( keyword != null ){
                    histories = JSON.parse(keyword);
                    histories.unshift(json);
                }
                else{
                    histories.unshift(json);
                }
                AsyncStorage.setItem('search',JSON.stringify(histories))
                dispatch(fetchAddHistoryRequest(histories))
            }
            )
        }
        catch(error){


        }
        

    };
}

export const fetchAddHistoryRequest = json =>({
    type: FETCHING_ADD_HISTORY,
    payload: json
})

export const fetchResetHistory = () =>{
    return async  dispatch => {
        try{
            let json = [];
            AsyncStorage.setItem('search',JSON.stringify(json))
            dispatch(fetchResetHistoryRequest(json));
        }
        catch(error){

<<<<<<< HEAD
        }
       
    }
}
export const fetchResetHistoryRequest = json => ({
    type: FETCHING_RESET_HISTORY,
    payload: json
})

export const fetchGetHistory = () => {
    return async  dispatch => {
        try{
            let histories = [];
            AsyncStorage.getItem('search', (err,keyword) =>{
            if(keyword != null){
                histories = JSON.parse(keyword);
            }
            else {
                histories = [];
            }
            dispatch(fetchGetHistoryRequest(histories))
        })  
        }
        catch(error){
        }
    } 
}

export const  fetchGetHistoryRequest = json => ({
    type: FETCHING_GET_HISTORY,
    payload: json
})
=======


// user QR code
export const fetchUserQRCodeSuccess = (json) => ({
    type: FETCHING_QRCODE_SUCCESS,
    payload: json
});

export const fetchUserQRCodeFailure = (error) => ({
    type: FETCHING_QRCODE_FAILURE,
    payload: error
});

export const fetchUserQRCode = () => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_id = await AsyncStorage.getItem('user_id');

            let requestConfig = {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + token }
            }

            let url = REQUEST_URL + '/api/users/' + user_id + '/qrcodes';
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            let data = json[0];
            
            dispatch(fetchUserQRCodeSuccess(data));
        }
        catch (error) {
            dispatch(fetchUserQRCodeFailure(error));
        }
    }
}



// Save Offer to User
export const postOfferToUserSuccess = (json) => ({
    type: POSTING_OFFER_TO_USER_SUCCESS,
    payload: json
});

export const postOfferToUserFailure = (error) => ({
    type: POSTING_OFFER_TO_USER_FAILURE,
    payload: error
});

export const postOfferToUser = (offer) => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_id = await AsyncStorage.getItem('user_id');
            const url = REQUEST_URL + '/api/users/' + user_id + '/offers';
            delete offer.id;

            let requestConfig = {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(offer)
            }

            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            
            dispatch(postOfferToUserSuccess(json));
        }
        catch (error) {
            dispatch(postOfferToUserFailure(error));
        }
    }
}


// GET - Available Offers
export const fetchAvailableOffersSuccess = (json) => ({
    type: FETCHING_AVAILABLE_OFFERS_TO_USER_SUCCESS,
    payload: json
});

export const fetchAvailableOffersFailure = (error) => ({
    type: FETCHING_AVAILABLE_OFFERS_TO_USER_FAILURE,
    payload: error
});

export const fetchAvailableOffers = () => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_id = await AsyncStorage.getItem('user_id');
            const url = REQUEST_URL + '/api/users/' + user_id + '/offers';

            let requestConfig = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            let respond = await fetch(url, requestConfig);
            let json = await respond.json();

            dispatch(fetchAvailableOffersSuccess(json));
        } 
        catch (error) {
            dispatch(fetchAvailableOffersFailure(error));
        }
    }
}
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
