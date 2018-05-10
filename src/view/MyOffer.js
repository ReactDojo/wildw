/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Entypo from '@expo/vector-icons/Entypo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Tab, Tabs, TabHeading, Container, Header, Content, Form, Item, Input, Label, Button, Text, Thumbnail, Icon, Right, List, ListItem, Card, CardItem, View } from 'native-base';
import {
  StyleSheet, Image, TouchableHighlight, Modal, Platform
} from 'react-native';
import Usercard from './Usercard';
import logoimage from '../images/logoimage.png';
import styles from '../styles/myoffer';
import barcodeimage from '../images/barcode.png';
import MyOfferList from '../components/MyOfferList';
import MyOfferReddemList from '../components/MyOfferReddemList';
import { fetchAvailableOffers } from '../redux/actions/OfferActions'
import { Actions } from 'react-native-router-flux';

class MyOffer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeWindow: "0",
      modalVisible: false
    };
    super(props);
  }
  componentWillMount() {
    this.setState({ activeWindow: "0" });
    this.setState({ popupWindow: "0" });
    this.setState({ modalVisible: false });
    this.props.fetchAvailableOffers();
  }
  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }
  render() {
    let myofferall_content = <MyOfferList />;
    let myofferallreddemlist_content = <MyOfferReddemList />;
    return (
      <Container style={styles.container}>
        <Grid>
          <Row style={{ height: 94 }}>
            <Content style={styles.header}>
              <Grid>
                <Col>
                  {Platform.OS === 'ios' ?
                    <TouchableHighlight style={{ marginTop: 40, marginLeft: 19 }} onPress={() => { Actions.pop(); }}>
                      <Entypo name='chevron-left' size={35} color="#0B9496" />
                    </TouchableHighlight>
                    : null}
                </Col>
                <Col>
                  <Image source={logoimage} style={styles.logo} />
                </Col>
                <Col ></Col>
              </Grid>
            </Content>
          </Row>
          <Row style={{ height: 66 }}>
            <Grid>
              <Col>
                <TouchableHighlight underlayColor='rgb(11,148,150)' onPress={() => this.setState({ activeWindow: "0" })} style={this.state.activeWindow == "0" ? styles.controlbutton_left : styles.controlbutton_left_deactivate}>
                  <Text style={styles.buttontext}>Available</Text>
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight underlayColor='rgb(11,148,150)' onPress={() => this.setState({ activeWindow: "1" })} style={this.state.activeWindow == "1" ? styles.controlbutton_right : styles.controlbutton_right_deactive}>
                  <Text style={styles.buttontext}>Redeemed</Text>
                </TouchableHighlight>
              </Col>
            </Grid>
          </Row>
          <Row>
            {this.state.activeWindow == "0" ? myofferall_content : null}
            {this.state.activeWindow == "1" ? myofferallreddemlist_content : null}
          </Row>
        </Grid>
      </Container>
    );
  }
}

export default connect(null, { fetchAvailableOffers })(MyOffer);