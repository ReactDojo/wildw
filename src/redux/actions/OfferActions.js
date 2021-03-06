import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Permissions, Notifications } from 'expo';
import {
    FETCHING_OFFER_REQUEST,
    FETCHING_OFFER_SUCCESS,
    FETCHING_OFFER_FAILURE,
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
    FETCHING_AVAILABLE_STORE_FAILURE,
    FETCHING_AVAILABLE_STORE_SUCCESS,
    FETCHING_ALL_STORE_SUCCESS,
    FETCHING_ALL_STORE_FAILURE,
    POSTING_USER_LOCATION_PENDING,
    POSTING_USER_LOCATION_SUCCESS,
    POSTING_USER_LOCATION_FAILURE,
    POSTING_USER_PUSH_NOTIFICATION_SUCCESS,
    POSTING_USER_PUSH_NOTIFICATION_FAILURE,
    POSTING_USER_PUSH_NOTIFICATION_PENDING
} from './types';

const REQUEST_URL = "https://offerbotapp.herokuapp.com";
// offer list
export const fetchingOfferRequest = () => ({ type: FETCHING_OFFER_REQUEST });
export const fetchingOfferSuccess = json => ({
    type: FETCHING_OFFER_SUCCESS,
    payload: json
});
export const fetchingOfferFailure = error => ({
    type: FETCHING_OFFER_FAILURE,
    payload: error
});
export const fetchOffer = () => {
    return async dispatch => {
        dispatch(fetchingOfferRequest());
        try {
            const value = await AsyncStorage.getItem('token');

            let requestConfig = {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + value }
            };
            let url = REQUEST_URL + '/api/Offers?filter={"where":{"userId": {"exists": false}}}';
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
    type: FETCHING_OFFER_FAILURE,
    payload: error
});
export const fetchOfferByCategory = (data) => {
    return async dispatch => {
        console.log('Category Search: ', data);
        dispatch(fetchingOfferByCategoryRequest());
        try {
            const value = await AsyncStorage.getItem('token');
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
        console.log('Searching: ', data);
        dispatch(fetchingSearchRequest());
        try {
            const value = await AsyncStorage.getItem('token');
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
    type: FETCHING_CATEGORY_FAILURE,
    payload: error
});
export const fetchCategory = () => {
    return async dispatch => {
        dispatch(fetchingCategoryRequest());
        try {
            const value = await AsyncStorage.getItem('token');

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

export const fetchingLoginError = error => ({
    type: FETCHING_LOGIN_ERROR,
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
            if (json && json.statusCode >= 400) {
                dispatch(fetchingLoginError(json.description))
            } else {
                dispatch(fetchingLoginSuccess(json));
                dispatch(fetchOffer());
                dispatch(fetchCategory());
                dispatch(fetchUserQRCode());
                dispatch(fetchAvailableOffers());
                Actions.offerlist();
            }
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
        try {
            let json = {
                name: data
            };

            AsyncStorage.getItem('search', (err, keyword) => {
                let histories = [];
                if (keyword != null) {
                    histories = JSON.parse(keyword);
                    histories.unshift(json);
                }
                else {
                    histories.unshift(json);
                }
                AsyncStorage.setItem('search', JSON.stringify(histories))
                dispatch(fetchAddHistoryRequest(histories))
            }
            )
        }
        catch (error) {


        }


    };
}

export const fetchAddHistoryRequest = json => ({
    type: FETCHING_ADD_HISTORY,
    payload: json
})

export const fetchResetHistory = () => {
    return async  dispatch => {
        try {
            let json = [];
            AsyncStorage.setItem('search', JSON.stringify(json))
            dispatch(fetchResetHistoryRequest(json));
        }
        catch (error) {

        }

    }
}
export const fetchResetHistoryRequest = json => ({
    type: FETCHING_RESET_HISTORY,
    payload: json
})

export const fetchGetHistory = () => {
    return async  dispatch => {
        try {
            let histories = [];
            AsyncStorage.getItem('search', (err, keyword) => {
                if (keyword != null) {
                    histories = JSON.parse(keyword);
                }
                else {
                    histories = [];
                }
                dispatch(fetchGetHistoryRequest(histories))
            })
        }
        catch (error) {
        }
    }
}

export const fetchGetHistoryRequest = json => ({
    type: FETCHING_GET_HISTORY,
    payload: json
})


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

export const postOfferToUserPending = () => ({
    type: POSTING_OFFER_TO_USER_PENDING,
    payload: true
});

export const postOfferToUser = (offer) => {
    return async dispatch => {
        dispatch(postOfferToUserPending());
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


//GET Stores by Offer
export const fetchAvailableStoresSuccess = (json) => ({
    type: FETCHING_AVAILABLE_STORE_SUCCESS,
    payload: json
});

export const fetchAvailableStoresFailure = (error) => ({
    type: FETCHING_AVAILABLE_STORE_FAILURE,
    payload: error
});

export const fetchOfferStore = (offer_id) => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token');
            //const user_id = await AsyncStorage.getItem('user_id');
            const url = REQUEST_URL + '/api/Offers/' + offer_id + '/store';

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

            dispatch(fetchAvailableStoresSuccess(json));
        }
        catch (error) {
            dispatch(fetchAvailableStoresFailure(error));
        }
    }
}





//GET All Stores
export const fetchAllStoresSuccess = (json) => ({
    type: FETCHING_ALL_STORE_SUCCESS,
    payload: json
});

export const fetchAllStoresFailure = (error) => ({
    type: FETCHING_ALL_STORE_FAILURE,
    payload: error
});

export const fetchAllStore = () => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token');
            //const user_id = await AsyncStorage.getItem('user_id');
            const url = REQUEST_URL + '/api/Stores';

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

            dispatch(fetchAllStoresSuccess(json));
        }
        catch (error) {
            dispatch(fetchAllStoresFailure(error));
        }
    }
}


// Post Users Current Location
export const postUserLocationSuccess = (json) => ({
    type: POSTING_USER_LOCATION_SUCCESS,
    payload: json
});

export const postUserLocationFailure = (error) => ({
    type: POSTING_USER_LOCATION_FAILURE,
    payload: error
});

export const postUserLocationPending = () => ({
    type: POSTING_USER_LOCATION_PENDING,
    payload: true
});

export const postUserLocation = (location) => {
    return async dispatch => {
        dispatch(postUserLocationPending());
        try {
            const token = await AsyncStorage.getItem('token');
            const user_id = await AsyncStorage.getItem('user_id');
            const url = REQUEST_URL + '/api/users/' + user_id + '/locations';

            let userLocation = {
                lat: location.coords.latitude,
                long: location.coords.longitude,
                address: location.address,
                log_type: location.log_type,
                userId: user_id
            }

            let requestConfig = {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                json: true,
                body: JSON.stringify(userLocation)
            }

            let respond = await fetch(url, requestConfig);
            let json = await respond.json();

            dispatch(postUserLocationSuccess(json));
        }
        catch (error) {
            dispatch(postUserLocationFailure(error));
        }
    }
}



export const postRegisterForPushNotificationSuccess = (json) => ({
    type: POSTING_USER_PUSH_NOTIFICATION_SUCCESS,
    payload: json
});

export const postRegisterForPushNotificationFailure = (error) => ({
    type: POSTING_USER_PUSH_NOTIFICATION_FAILURE,
    payload: error
});

export const postRegisterForPushNotificationPending = () => ({
    type: POSTING_USER_PUSH_NOTIFICATION_PENDING,
    payload: true
});


export const registerForPushNotificationsAsync = () => {
    return async dispatch => {
        dispatch(postRegisterForPushNotificationPending());
        try {
            const login_token = await AsyncStorage.getItem('token');
            const user_id = await AsyncStorage.getItem('user_id');
            const url = REQUEST_URL + '/api/users/' + user_id + '/pushtokens';
    
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
    
            let finalStatus = existingStatus;
    
            // only ask if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            if (existingStatus !== 'granted') {
                // Android remote notification permissions are granted during the app
                // install, so this will only ask on iOS
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
    
            // Stop here if the user did not grant permissions
            if (finalStatus !== 'granted') {
                return;
            }
    
            // Get the token that uniquely identifies this device
            let push_token = await Notifications.getExpoPushTokenAsync();
    

            let requestConfig = {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + login_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: push_token,
                    userId: user_id
                }),
                json: true
            }

            // POST the token to your backend server from where you can retrieve it to send push notifications.
            let response = await fetch(url, requestConfig);
            let json = await response.json();

            dispatch(postRegisterForPushNotificationSuccess(json));
        }
        catch (error) {
            dispatch(postRegisterForPushNotificationFailure(error));
        }
        
    }

}