import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Tab, Tabs, TabHeading, Container, Header, Content, Form, Item, Input, Label, Button, Text, Thumbnail, Icon, Right, List, ListItem, Card, CardItem, View } from 'native-base';
import { StyleSheet, Image, TouchableHighlight, Modal, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Usercard from './Usercard';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import logoimage from '../images/logoimage.png';
import styles from '../styles/map';
import barcodeimage from '../images/barcode.png';
import MyOfferList from '../components/MyOfferList';
import MyOfferReddemList from '../components/MyOfferReddemList';
import { LinearGradient } from 'expo';
import Feather from '@expo/vector-icons/Entypo';
//import QRCode from 'react-native-qrcode';
import { fetchUserQRCode } from '../redux/actions/OfferActions';
import { connect } from 'react-redux';
import SVGImage from 'react-native-remote-svg'
import { MapView, Video, Location, Permissions } from 'expo';
import { Marker } from 'react-native-maps';
import { fetchAllStore } from '../redux/actions/OfferActions';

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      stores: [],
      wildwood_casino:
        {
          name: 'Wildwood Casino',
          address: '119 N Fifth St',
          city: 'Cripple Creek',
          state: 'CO',
          zipcode: '80813',
          location: {
            lat: 38.747789,
            lng: -105.1766526
          },
          phone_number: '(719) 244-9700'
        },
      selected_location: {}
    };

  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    let stores = [].concat(this.state.wildwood_casino, ...this.props.all_stores);

    this.setState({
      stores: stores,
      selected_location: this.state.wildwood_casino
    })
  }

  _setSelected = store => {
    this.setState({
      selected_location: store
    })
  }

  render() {
    let { stores, selected_location } = this.state;
    return (
      <Container style={styles.container}>
        <Grid>
          <Row style={{ height: 94 }}>
            <Content style={styles.header}>
              <Grid>
                <Col></Col>
                <Col>
                  <Image source={logoimage} style={styles.logo} />
                </Col>
                <Col></Col>
              </Grid>
            </Content>
          </Row>
          <Row>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 38.7504664,
                longitude: -105.1757747,
                latitudeDelta: 0.02,
                longitudeDelta: 0.008,
              }} >
              {stores ?
                stores.map((store, index) => {
                  return (
                    <MapView.Marker
                      onPress={() => this._setSelected(store)}
                      coordinate={{ latitude: store.location.lat, longitude: store.location.lng }}
                      title={store.name}
                      key={index + "marker"}
                      description={store.address + ', ' + store.city + ', ' + store.state + ', ' + store.zipcode}
                    />
                  )
                })
                : null
              }
            </MapView>
          </Row>
          <Row style={{ height: 150, padding: 15 }}>
            <Content>
              <Row>
                <Text style={styles.mapTitle}>{selected_location.name}</Text>
              </Row>
              <Row>
                <Text style={styles.mapDetail}>{selected_location.address + ', ' + selected_location.city + ', ' + selected_location.state + ' ' + selected_location.zipcode}</Text>
              </Row>
              <Row>
                <Text style={styles.mapDetail}>{selected_location.phone_number}</Text>
              </Row>
              <Row>
                <Col>
                  <TouchableHighlight onPress={Actions.pop}>
                    <Text style={styles.pop_cancel}>Cancel</Text>
                  </TouchableHighlight>
                </Col>
              </Row>
            </Content>
          </Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    map_url: '',
    all_stores: state.OfferReducer.all_stores
  }
}

export default connect(mapStateToProps, { fetchAllStore })(Map);