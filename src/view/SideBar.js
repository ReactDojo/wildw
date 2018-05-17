import React from "react";
import PropTypes from 'prop-types';
import { AppRegistry, Image, StatusBar,StyleSheet,TouchableHighlight} from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Left,
  Body,Thumbnail,View
} from "native-base";
 
import { Actions } from 'react-native-router-flux';
import dumpimage from '../images/dump.jpg';
import styles from '../styles/sidebar';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Font } from 'expo';
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }
  async componentDidMount() {
    try {
      await Font.loadAsync({
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Black': require('../../assets/fonts/Montserrat-Black.ttf'),
        'Montserrat-BlackItalic': require('../../assets/fonts/Montserrat-BlackItalic.ttf'),
        'Montserrat-BoldItalic': require('../../assets/fonts/Montserrat-BoldItalic.ttf'),
        'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat-ExtraBoldItalic': require('../../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
        'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf'),
        'Montserrat-ExtraLightItalic': require('../../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
        'Montserrat-Italic': require('../../assets/fonts/Montserrat-Italic.ttf'),
        'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-LightItalic': require('../../assets/fonts/Montserrat-LightItalic.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-MediumItalic': require('../../assets/fonts/Montserrat-MediumItalic.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-SemiBoldItalic': require('../../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        'Montserrat-Thin': require('../../assets/fonts/Montserrat-Thin.ttf'),
        'Montserrat-ThinItalic': require('../../assets/fonts/Montserrat-ThinItalic.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  } 
  render() {
    if(this.state.fontLoaded){
      return (
        <Container style={styles.container}>
        <Content>
          <Grid>
            <Row>
              <Image resizeMode='cover' style={styles.profile_image} source={dumpimage} />
            </Row>
            <Row>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.name_text}>John Smith</Text>
                <Text style={styles.job_text}>Platinum Player</Text>
                <Text style={styles.follow_text}>590,075 Points</Text>
              </View>
            </Row>
            <Row>
              <View>
                <TouchableHighlight onPress={() => Actions.offerlist()}>
                  <Text style={styles.menu_text}>Home</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Actions.myoffer()}>
                  <Text style={styles.menu_text}>myOffers</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Actions.mycard()}>
                  <Text style={styles.menu_text}>myCard</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Actions.map()}>
                  <Text style={styles.menu_text}>Map</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Actions.settings()}>
                  <Text style={styles.menu_text}>Settings</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Actions.login()}>
                  <Text style={styles.menu_text}>Logout</Text>
                </TouchableHighlight>
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
      );
    }
    else
      return null;

  }
}

