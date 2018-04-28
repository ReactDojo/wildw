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
import { fetchOffer, fetchCategory, fetchUserQRCode } from '../../redux/actions/OfferActions';
import * as Progress from 'react-native-progress';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        var _this = this;
        this.props.fetchOffer();
        this.props.fetchCategory();
        this.props.fetchUserQRCode();
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



export default connect(null, { fetchOffer, fetchCategory, fetchUserQRCode })(Home);