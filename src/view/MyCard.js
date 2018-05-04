import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Tab, Tabs, TabHeading, Container, Header, Content, Form, Item, Input, Label, Button, Text, Thumbnail, Icon, Right, List, ListItem, Card, CardItem, View } from 'native-base';
import { StyleSheet, Image, TouchableHighlight, Modal, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Usercard from './Usercard';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import logoimage from '../images/logoimage.png';
import styles from '../styles/myCard';
import barcodeimage from '../images/barcode.png';
import MyOfferList from '../components/MyOfferList';
import MyOfferReddemList from '../components/MyOfferReddemList';
import { LinearGradient } from 'expo';
import Feather from '@expo/vector-icons/Entypo';
//import QRCode from 'react-native-qrcode';
import { fetchUserQRCode } from '../redux/actions/OfferActions';
import { connect } from 'react-redux';
import SVGImage from 'react-native-remote-svg'

class MyCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Grid>
          <Row style={{ height: 74 }}>
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
            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', marginTop: 50 }}>
              <Content>
                {Object.keys(this.props.qr_code).length <= 0 ?
                  <Text style={{ color: '#fff', marginBottom: 10, textAlign: 'center', width: 300 }}>There are errors with your Players Club Code. Please check with your system administrator.</Text>
                  :
                  <View>
                    <Text style={{ color: '#fff', marginBottom: 10, textAlign: 'center' }}>This is your Players Club Code</Text>
                    <View style={{ backgroundColor: '#fff' }}>
                      <SVGImage style={{ width: 250, height: 250 }} source={{ uri: this.props.qr_code.url }} />
                    </View>
                    <Text style={{ color: '#fff', marginTop: 10, textAlign: 'center' }}>{this.props.qr_code.key}</Text>
                  </View>
                }
              </Content>
            </View>
          </Row>
          <Row style={{ height: 100 }}>
            <Grid>
              <Col>
                <TouchableHighlight onPress={Actions.pop}>
                  <Text style={styles.pop_cancel}>Cancel</Text>
                </TouchableHighlight>
              </Col>
            </Grid>
          </Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    qr_code: state.OfferReducer.qr_code
  }
}

export default connect(mapStateToProps)(MyCard);