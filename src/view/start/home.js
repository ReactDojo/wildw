import React, { Component } from 'react';
var { View, Text, AsyncStorage } = require('react-native');
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from './index'; //Import your Button
import styles from '../../styles/auth/index' //Import your styles
import { fetchOffer, fetchCategory, fetchUserQRCode, fetchAvailableOffers, fetchGetHistory } from '../../redux/actions/OfferActions';
import * as Progress from 'react-native-progress';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var _this = this;
        this.props.fetchOffer();
        this.props.fetchCategory();
        this.props.fetchGetHistory();
        this.props.fetchUserQRCode();
        this.props.fetchAvailableOffers();
        
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



export default connect(null, 
    { fetchOffer, fetchCategory, fetchUserQRCode, fetchAvailableOffers, fetchGetHistory }
)(Home);
