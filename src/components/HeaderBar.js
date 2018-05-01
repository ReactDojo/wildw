import React, { Component } from "react";
import { connect } from 'react-redux';
import { StyleSheet, Image, TouchableHighlight } from "react-native";
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Content, Button } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
import { LinearGradient } from 'expo';
import styles from '../styles/HeaderBar';
import logo_img from '../images/logoimage.png';

class HeaderBar extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Content style = {styles.header}>
        <Grid>
          <Col>
            <TouchableHighlight onPress = {() => { Actions.drawerOpen(); }}>
              <LinearGradient 
                start = {{ x: 0.0, y: 0.25 }} 
                end = {{ x: 0.5, y: 1.0 }}
                locations = {[0, 0.6, 1]}
                colors = {['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} 
                style = {styles.linearGradient}>
                <Feather name='menu' size={35} color="#FFFFFF" />
              </LinearGradient>
            </TouchableHighlight>
          </Col>
          <Col>
            <Image source={logo_img} style = {styles.logo} />
          </Col>
          <Col >
            <Button transparent style = {{ alignSelf: 'flex-end', marginRight: 19, marginTop: 17 }} onPress = {() => this.openModal()}>
              <Foundation name = 'filter' size={30} color="#0B9496" />
            </Button>
          </Col>
        </Grid>
      </Content>
    );
  }
}

function mapStateToProps(state, props) {
  return {

  }
}

export default connect(mapStateToProps, null)(HeaderBar);