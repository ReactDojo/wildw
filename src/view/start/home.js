import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Permissions, Location } from 'expo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from './index';
import styles from '../../styles/auth/index'
import { fetchOffer, fetchCategory, fetchUserQRCode, fetchAvailableOffers, fetchGetHistory, fetchAllStore, postUserLocation } from '../../redux/actions/OfferActions';
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
    this.props.fetchAllStore();
    this._getLocationAsync((location) => {
      this.props.postUserLocation(location);
    });

    AsyncStorage.getItem('token', (err, token) => {
      if (token === null) Actions.welcome();
      else Actions.offerlist();
    });
  }

  _getLocationAsync = async (cb) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);
    let addressObj = { 
      address: address[0].name + ', ' + address[0].city + ', ' + address[0].region + ' ' + address[0].postalCode + ', ' + address[0].country,
      log_type: 'USER_LOGIN_LOCATION' 
    };
    let locationObj = Object.assign(addressObj, location);
    cb(locationObj);
  };

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
  { fetchOffer, fetchCategory, fetchUserQRCode, fetchAvailableOffers, fetchGetHistory, fetchAllStore, postUserLocation }
)(Home);
