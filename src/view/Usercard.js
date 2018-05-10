import React, { Component } from 'react';
import {
  StyleSheet, Image, TouchableHighlight, Modal, TextInput, ActivityIndicator, AsyncStorage
} from 'react-native';
import Feather from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Font } from 'expo';
import { Container, Header, Content, Form, Item, Input, Title, Icon, Label, Button, Text, Thumbnail, Right, Left, Body, View, Card, CardItem, List, ListItem } from 'native-base';
import CardDetails from './CardDetails';
import SideBar from "./SideBar";
import MyOffer from './MyOffer';
import { LinearGradient } from 'expo';
import logoimage from '../images/logoimage.png';
import dumpimage from '../images/dump.jpg';
import styles from '../styles/usercard';
import { Actions } from 'react-native-router-flux';
import { fetchOffer, fetchSearch, fetchAddHistory, fetchResetHistory } from '../redux/actions/OfferActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OfferList from '../components/OfferList';
import CategoryList from '../components/CategoryList';
import SearchList from '../components/SearchList';
import * as Progress from 'react-native-progress';

class Usercard extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.search_all = this.search_all.bind(this);
    this.gotocarddetails = this.gotocarddetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
    search_keyword = '';
    history = '';

    this.state = {
      searckeyword: '',
      fontLoaded: false
    };

  }

  search() {
    this.props.fetchSearch(this.state.searckeyword);
    this.props.fetchAddHistory(this.state.searckeyword);
    this.closeModal();
  }

  search_all() {
    this.props.fetchOffer();
    this.props.fetchResetHistory();
  }

  gotocarddetails() {
    Actions.offerdetails();
  }

  componentWillMount() {
    this.setState({ popupWindow: "0" });
    this.setState({ modalVisible: false });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
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
    this.props.fetchOffer();
  }

  render() {
    if (this.state.fontLoaded) {
      let offers = this.props.randomoffer.offer.filter((offer) => offer.userId === "" || !offer.userId);
      let content = <OfferList offer={offers} />;
      if (this.props.randomoffer.isFetching) {
        content = <Progress.Circle size={30} indeterminate={true} style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', }} />;
      }

      let content_search = <SearchList close={this.closeModal} />;
      if (this.props.randomoffer.isFetching) {
        content_search = <Progress.Circle size={30} indeterminate={true} />;
      }
      return (
        <Container style={styles.container}>
          <Grid>
            <Row style={{ height: 94 }}>
              <Content style={styles.header}>
                <Grid>
                  <Col>
                    <TouchableHighlight style={{ marginTop: 40, marginLeft: 19 }} onPress={() => { Actions.drawerOpen(); }}>
                      <Feather name='menu' size={35} color="#0B9496" />
                    </TouchableHighlight>
                  </Col>
                  <Col>
                    <Image source={logoimage} style={styles.logo} />
                  </Col>
                  <Col >
                    <Button transparent style={{ alignSelf: 'flex-end', marginRight: 19, marginTop: 37 }} onPress={() => this.openModal()}>
                      <Foundation name='filter' size={30} color="#0B9496" />
                    </Button>
                  </Col>
                </Grid>
              </Content>
            </Row>
            <Row>
              <Content style={{ flex: 1, alignSelf: 'flex-start', }}>
                {content}
              </Content>
            </Row>
          </Grid>
          <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            onRequestClose={() => this.closeModal()}
          >
            <Grid>
              <Row style={{ height: 74, backgroundColor: '#000000' }}>
                <Grid>
                  <Col>
                    <TouchableHighlight onPress={() => this.setState({ popupWindow: "0" })} style={this.state.popupWindow == "0" ? styles.popcontrolbutton_left : styles.popcontrolbutton_left_deactivate}>
                      <Text style={styles.buttontext_small}>Categories</Text>
                    </TouchableHighlight>
                  </Col>
                  <Col>
                    <TouchableHighlight onPress={() => this.setState({ popupWindow: "1" })} style={this.state.popupWindow == "1" ? styles.popcontrolbutton_right : styles.popcontrolbutton_right_deactive}>
                      <Text style={styles.buttontext_small}>Search</Text>
                    </TouchableHighlight>
                  </Col>
                </Grid>
              </Row>
              <Row style={{ backgroundColor: '#000000' }}>
                {this.state.popupWindow == "0"
                  ? <View>
                    <Text style={styles.categorytitletext}>Categories</Text>
                    <CategoryList close={this.closeModal} />
                  </View>
                  :
                  null
                }
                {this.state.popupWindow == "1"
                  ? <Grid>
                    <Row style={{ height: 80 }}>
                      <Grid>
                        <Col>
                          <TextInput placeholder={'Search'} autoCapitalize={'none'} placeholderTextColor={'#FFFFFF'} style={{ width: 280, alignSelf: 'stretch', marginLeft: 29, color: '#FFFFFF', fontSize: 30, fontFamily: 'Montserrat-SemiBold', marginTop: 30, borderLeftColor: '#000000', borderTopColor: '#000000', borderRightColor: '#000000', borderBottomColor: '#FFFFFF', borderWidth: 1 }}
                            onChangeText={
                              (text) => (
                                this.setState({ searckeyword: text }
                                ))
                            }
                            onSubmitEditing={this.search} />
                        </Col>
                        <Col>
                          <TouchableHighlight onPress={this.search} >
                            <FontAwesome name='search' size={30} color="#FFFFFF" style={{ alignSelf: 'flex-end', marginRight: 30, marginTop: 30 }} />
                          </TouchableHighlight>
                        </Col>
                      </Grid>
                    </Row>
                    <Row style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', }}>
                      {content_search}
                    </Row>
                  </Grid>
                  :
                  null

                }
              </Row>
              <Row style={{ height: 100, backgroundColor: '#000000' }}>
                <Grid>
                  <Col>
                    <TouchableHighlight onPress={this.search_all} >
                      <Text style={styles.clearbutton}>Clear</Text>
                    </TouchableHighlight>
                  </Col>
                  <Col>
                    <TouchableHighlight onPress={() => this.closeModal()}>
                      <Text style={styles.cancelbutton}>Cancel</Text>
                    </TouchableHighlight>
                  </Col>
                </Grid>
              </Row>
            </Grid>
          </Modal>
        </Container>);
    } else {
      return (<Text>loading..</Text>);
    }
  }
}
function mapStateToProps(state, props) {
  return {
    randomoffer: state.OfferReducer
  }
}
export default connect(mapStateToProps, { fetchOffer, fetchSearch, fetchAddHistory, fetchResetHistory })(Usercard);






