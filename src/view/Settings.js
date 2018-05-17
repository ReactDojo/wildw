import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Actions } from 'react-native-router-flux';
import { Tab, Tabs, TabHeading, Container, Header, Content, Form, Item, Input, Label, Button, Text, Thumbnail, Icon, Right, List, ListItem, Card, CardItem, View, CheckBox, Body } from 'native-base';
import { StyleSheet, Image, TouchableHighlight, Modal, Platform } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { fetchUserQRCode } from '../redux/actions/OfferActions';
import { connect } from 'react-redux';
import styles from '../styles/Settings';

import logo from '../images/logoimage.png';

class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notify_new_offers: true,
      notify_redeemed: true,
      notify_one_day: false,
      notify_on_day_of: false
    }

  }

  _toggleCheckBox = (box) => {
    this.setState({
      [box]: !this.state[box]
    })
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
                  <Image source={logo} style={styles.logo} />
                </Col>
                <Col></Col>
              </Grid>
            </Content>
          </Row>
          <Row>
            <View style={{ flex: 1, marginTop: 50, marginRight: 15 }}>
              <ListItem onPress={() => this._toggleCheckBox('notify_new_offers')}>
                <CheckBox checked={this.state.notify_new_offers} />
                <Body>
                  <Text style={styles.text}>Notify me about new offers</Text>
                </Body>
              </ListItem>
              <ListItem onPress={() => this._toggleCheckBox('notify_redeemed')}>
                <CheckBox checked={this.state.notify_redeemed} />
                <Body>
                  <Text style={styles.text}>Notify me when an offer is redeemed</Text>
                </Body>
              </ListItem>
              <ListItem onPress={() => this._toggleCheckBox('notify_one_day')}>
                <CheckBox checked={this.state.notify_one_day} />
                <Body>
                  <Text style={styles.text}>Notify me 1 day before an offer expires</Text>
                </Body>
              </ListItem>
              <ListItem onPress={() => this._toggleCheckBox('notify_on_day_of')}>
                <CheckBox checked={this.state.notify_on_day_of} />
                <Body>
                  <Text style={styles.text}>Notify me on the day an offer expires</Text>
                </Body>
              </ListItem>
            </View>
          </Row>
          <Row style={{ height: 100 }}>
            <Grid>
              <Col>
                <TouchableHighlight onPress={Actions.pop}>
                  <Text style={styles.save_btn}>Save</Text>
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight onPress={Actions.pop}>
                  <Text style={styles.cancel_btn}>Cancel</Text>
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

export default connect(mapStateToProps)(Settings);