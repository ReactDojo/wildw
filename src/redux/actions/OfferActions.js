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
    FETCHING_CATEGORY_FAILURE,
    FETCHING_OFFERBYCATEGORY_REQUEST,
    FETCHING_OFFERBYCATEGORY_SUCCESS,
    FETCHING_OFFERBYCATEGORY_FAILURE,
    FETCHING_SEARCH_REQUEST,
    FETCHING_SEARCH_SUCCESS,
<<<<<<< HEAD
    FETCHING_SEARCH_FAILURE

} from './types';
import {AsyncStorage} from 'react-native';

=======
    FETCHING_SEARCH_FAILURE,
    FETCHING_QRCODE_SUCCESS,
    FETCHING_QRCODE_FAILURE,
    POSTING_OFFER_TO_USER_SUCCESS,
    POSTING_OFFER_TO_USER_FAILURE,
    FETCHING_AVAILABLE_OFFERS_TO_USER_SUCCESS,
    FETCHING_AVAILABLE_OFFERS_TO_USER_FAILURE
} from './types';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import store from '../store';
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
const REQUEST_URL = "https://offerbotapp.herokuapp.com";
// offer list
<<<<<<< HEAD
export const fetchingOfferRequest = () => ({type: FETCHING_OFFER_REQUEST});

=======
export const fetchingOfferRequest = () => ({ type: FETCHING_OFFER_REQUEST });
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD
        // setTimeout(() => {dispatch(fetchingOfferRequest());},8000);
=======
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('mytoken:', value);
            let requestConfig = {
                method: "GET",
<<<<<<< HEAD
                headers: {'Authorization': 'Bearer ' + value}
=======
                headers: { 'Authorization': 'Bearer ' + value }
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD

// offer  by category
export const fetchingOfferByCategoryRequest = () => ({type: FETCHING_OFFER_REQUEST});

=======
export const fetchingOfferByCategoryRequest = () => ({ type: FETCHING_OFFER_REQUEST });
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD
        // setTimeout(() => {dispatch(fetchingOfferRequest());},8000);
=======
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('mytoken:', value);
            let requestConfig = {
                method: "GET",
<<<<<<< HEAD
                headers: {'Authorization': 'Bearer ' + value}
=======
                headers: { 'Authorization': 'Bearer ' + value }
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD

// get search result
export const fetchingSearchRequest = () => ({type: FETCHING_SEARCH_REQUEST});

=======
export const fetchingSearchRequest = () => ({ type: FETCHING_SEARCH_REQUEST });
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD
        // setTimeout(() => {dispatch(fetchingOfferRequest());},8000);
=======
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('mytoken:', value);
            let requestConfig = {
                method: "GET",
<<<<<<< HEAD
                headers: {'Authorization': 'Bearer ' + value}
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
export const fetchingCategoryRequest = () => ({type: FETCHING_CATEGORY_REQUEST});

=======
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
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD
        // setTimeout(() => {dispatch(fetchingOfferRequest());},8000);
=======
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
        try {
            const value = await AsyncStorage.getItem('token');
            console.log('mytoken:', value);
            let requestConfig = {
                method: "GET",
<<<<<<< HEAD
                headers: {'Authorization': 'Bearer ' + value}
=======
                headers: { 'Authorization': 'Bearer ' + value }
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD
export const fetchingLoginRequest = () => ({type: FETCHING_LOGIN_REQUEST});
=======
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe

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
<<<<<<< HEAD
            console.log('=====================', respond);
=======
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
            let json = await respond.json();
            dispatch(fetchingLoginSuccess(json));
            dispatch(fetchOffer());
            dispatch(fetchCategory());
<<<<<<< HEAD
=======
            dispatch(fetchUserQRCode());
            dispatch(fetchAvailableOffers());
            Actions.offerlist();
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
        }
        catch (error) {
            dispatch(fetchingLoginFailure(error));
        }
    }
}

//off user register
<<<<<<< HEAD
export const fetchingSignupRequest = () => ({type: FETCHING_SIGNUP_REQUEST});

=======
export const fetchingSignupRequest = () => ({ type: FETCHING_SIGNUP_REQUEST });
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD
            // const value =await AsyncStorage.getItem('token');
            // console.log('mytoken:',value);
=======
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
<<<<<<< HEAD
=======
            Actions.login();
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
        }
        catch (error) {
            dispatch(fetchingSignupFailure(error));
        }
<<<<<<< HEAD
=======
    }
}



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
>>>>>>> 629cc2243a8056ed18341614b144d0bed16298fe
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
