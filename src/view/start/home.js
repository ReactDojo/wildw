/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */



import React, { Component } from 'react';
var { View, Text, AsyncStorage } = require('react-native');

import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';

// import {setStatus, logout} from '../../reducers/actions/index'; //Import your actions

import { Button } from './index'; //Import your Button

import styles from '../../styles/auth/index' //Import your styles
<<<<<<< HEAD
import {fetchOffer, fetchCategory, fetchGetHistory} from '../../redux/actions/OfferActions'; 
=======
import { fetchOffer, fetchCategory, fetchUserQRCode, fetchAvailableOffers } from '../../redux/actions/OfferActions';
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
import * as Progress from 'react-native-progress';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        var _this = this;
        this.props.fetchOffer();
        this.props.fetchCategory();
<<<<<<< HEAD
        this.props.fetchGetHistory();
=======
        this.props.fetchUserQRCode();
        this.props.fetchAvailableOffers();
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
        AsyncStorage.getItem('token', (err, token) => {
            if (token === null) Actions.welcome();
            else Actions.offerlist();
        });
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    <View>
                        <Progress.Circle size={30} indeterminate={true} style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }} />
                    </View>
                }
            </View>
        );
    }
};



<<<<<<< HEAD
export default connect(null, {fetchOffer,fetchCategory,fetchGetHistory})(Home);
=======
export default connect(null, { fetchOffer, fetchCategory, fetchUserQRCode, fetchAvailableOffers })(Home);
>>>>>>> 22aeddbeacd405e34d2e8b634f4d3778cffe51a3
