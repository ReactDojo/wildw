import React, { Component } from 'react';
import { StyleSheet, Image, TouchableHighlight, FlatList, Dimensions, Modal, Platform, TextInput, ScrollView } from 'react-native';
import GridView from "react-native-easy-grid-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
import { Container, Header, Content, Tab, Tabs, TabHeading, Form, Item, Input, Label, Button, Text, Thumbnail, Icon, Right, Left, Body, View, Card, CardItem, List, ListItem, Toast, Spinner } from 'native-base';
import dumpimage from '../images/dump.jpg';
import logoimage from '../images/logoimage.png';
import styles from '../styles/carddetails';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import Gallery from 'react-native-image-gallery';
import HeaderBar from '../components/HeaderBar';
import { Font } from 'expo';
import { Linking, Share, Alert } from 'react-native';
import { postOfferToUser } from '../redux/actions/OfferActions';
import { connect } from 'react-redux';
import { MapView, Video, Location, Permissions } from 'expo';
import { Marker } from 'react-native-maps';
import moment from 'moment';
import { fetchOfferStore } from '../redux/actions/OfferActions';
import call from 'react-native-phone-call';

const { width, height } = Dimensions.get('window');
const equalWidth = (width - 116) / 3;

class CardDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
    this.state = {
      isOpen: false,
      activeWindow: "0",
      showGallery: false,
      images_array: this._formatImageArray(this.props.details.image_urls),
      images_index: 0,
      location: {
        latitude: 0,
        longitude: 0
      }
    }

    this._call = this._call.bind(this);
    this._openGallery = this._openGallery.bind(this);
    this._toggleGallery = this._toggleGallery.bind(this);
    this.shareOnFacebook = this.shareOnFacebook.bind(this);
    this.shareOnTwitter = this.shareOnTwitter.bind(this);
    this.shareOnEmailwithSMS = this.shareOnEmailwithSMS.bind(this);
    this.shareOnEmail = this.shareOnEmail.bind(this);
    this.shareOnSMS = this.shareOnSMS.bind(this);
    this._saveOfferToUser = this._saveOfferToUser.bind(this);
    this._getLocationAsync = this._getLocationAsync.bind(this);
  }

  async _getLocationAsync(address) {
    let location = await Location.geocodeAsync(address);
    return location;
  }

  _formatImageArray(input_array) {
    let output = input_array.map((image) => {
      return { source: { uri: image } }
    })
    return output;
  }

  _keyExtractor = (item, index) => index.toString();

  _toggleGallery() {
    this.setState({ showGallery: !this.state.showGallery });
  }

  _openGallery() {
    this._toggleGallery();
  }


  _saveOfferToUser() {
    this.props.postOfferToUser(this.props.details);
    setTimeout(() => {
      Actions.pop();
      Toast.show({
        text: 'Your offer has been saved. Go to myOffers to redeem this when visiting the cashier station.',
        buttonText: 'Dismiss',
        position: "top",
        type: "success",
        duration: 10000
      })
    }, 2000);
  }

  renderRowItem = ({ item }) => {
    return (
      <View style={{ margin: 5 }}>
        <TouchableHighlight onPress={this._openGallery}>
          <Image style={{ height: 86, width: equalWidth }} source={{ uri: item.source.uri }} resizeMode='cover' />
        </TouchableHighlight>
      </View>
    )
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
      const data = this.props.fetchOfferStore(this.props.details.id);
      this.setState({
        store: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillReceiveProps() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const address2 = this.props.store.address + ', ' + this.props.store.city + ', ' + this.props.store.state + this.props.store.zipcode;
    const location = await this._getLocationAsync(address2);
    this.setState({
      location: location[0]
    });
  }

  shareOnTwitter() {
    // Share.share({
    //   message: this.props.details.description,
    //   url: 'http://bam.tech',
    //   title: 'Share with wildsoodoffers'
    // }, {
    //   // Android only:
    //   dialogTitle: 'Share with wildsoodoffers',
    //   // iOS only:
    //   excludedActivityTypes: [
    //     'com.apple.UIKit.activity.PostToTwitter'
    //   ]
    // })
    let text = 'Hi Nice too meet you!';
    let send_url = 'www.google.com';
    let url = 'https://twitter.com/intent/tweet?text=' + this.props.details.description + '&url=' + send_url;
    Linking.openURL(url).then((data) => {
      console.log('open whatsapp')
    }).catch(() => {
      console.log('App not installed')
    });
  }

  shareOnFacebook() {
    let text = 'Hi Nice too meet you!';
    let send_url = 'www.google.com';
    let url = 'facebook://profile';
    Linking.openURL(url).then((data) => {
      console.log('open whatsapp')
    }).catch(() => {
      Alert.alert('Not install facebook app please install!');
    });
    // Share.share({
    //   message: this.props.details.description,
    //   url: 'http://bam.tech',
    //   title: 'Share with wildsoodoffers'
    // }, {
    //   // Android only:
    //   dialogTitle: 'Share with wildsoodoffers',
    //   // iOS only:
    //   // excludedActivityTypes: [
    //   //   'com.apple.UIKit.activity.PostToTwitter'
    //   // ]
    // })
  }

  _call(){
    console.log('get here');

    const phone = {
      number: this.props.store.phone_number,
      prompt: true,
    }

    call(phone).catch(console.error);

  }

  shareOnEmailwithSMS() {
    Share.share({
      message: this.props.details.description,
      url: 'http://bam.tech',
      title: 'Share with wildsoodoffers'
    }, {
        // Android only:
        dialogTitle: 'Share with wildsoodoffers',
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
  }
  shareOnEmail() {
    let url = 'mailto: support@expo.io?subject=Wildwoodoffers&body=' + this.props.details.description;
    Linking.openURL(url).then((data) => {
      console.log('open whatsapp')
    }).catch(() => {
      Alert.alert('Not install mail app please install!');
    });
  }
  shareOnSMS() {
    let url = 'sms:+123456789?body=' + this.props.details.description;
    Linking.openURL(url).then((data) => {

    }).catch(() => {
      Alert.alert('Not install sms app please install!');
    });
  }
  render() {
    if (this.state.fontLoaded) {
      let image_content = <Image resizeMode='cover' source={{ uri: this.props.details.featured_image_url }} style={styles.listimage} />;
      return (
        <Container style={styles.container}>
          <Grid>
            <Row style={{ height: 74 }}>
              <Content style={styles.header}>
                <Grid>
                  <Col>
                    {Platform.OS === 'ios' ?
                      <TouchableHighlight onPress={() => { Actions.pop(); }}>
                        <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                          locations={[0, 0.6, 1]}
                          colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.back_button}>
                          <Entypo name='chevron-left' size={35} color="#FFFFFF" />
                        </LinearGradient>
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
            <Row>
              <Grid>
                <Row style={{ height: 260 }}>
                  {image_content}
                </Row>
                <Row style={this.state.activeWindow == "2" ? styles.tabcontente1 : styles.tabcontente}>
                  <Grid>
                    <Row style={{ height: 60, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                      <Grid>
                        <Col>
                          <TouchableHighlight underlayColor='rgb(2,139,141)' onPress={() => this.setState({ activeWindow: "0" })} style={{ borderTopLeftRadius: 15, display: 'flex', justifyContent: 'center' }}>
                            <Text style={this.state.activeWindow == "0" ? styles.tabactivetext : styles.tabtext}>DETAILS</Text>
                          </TouchableHighlight>
                        </Col>
                        <Col>
                          <TouchableHighlight underlayColor='rgb(2,139,141)' onPress={() => this.setState({ activeWindow: "1" })}>
                            <Text style={this.state.activeWindow == "1" ? styles.tabactivetext : styles.tabtext}>LOCATION</Text>
                          </TouchableHighlight>
                        </Col>
                        <Col>
                          <TouchableHighlight underlayColor='rgb(2,139,141)' onPress={() => this.setState({ activeWindow: "2" })}>
                            <Text style={this.state.activeWindow == "2" ? styles.tabactivetext : styles.tabtext}>MEDIA</Text>
                          </TouchableHighlight>
                        </Col>
                        <Col>
                          <TouchableHighlight underlayColor='rgb(2,139,141)' onPress={() => this.setState({ activeWindow: "3" })} style={{ borderTopRightRadius: 15, }}>
                            <Text style={this.state.activeWindow == "3" ? styles.tabactivetext : styles.tabtext}>SHARE</Text>
                          </TouchableHighlight>
                        </Col>
                      </Grid>
                    </Row>
                    {/* DETAILS */}
                    {this.state.activeWindow == "0" ?
                      <Row>
                        <Grid>
                          <Row>
                            <View style={{ flex: 1, marginLeft: 19, marginRight: 25 }}>
                              <Text style={{ fontSize: 30, color: '#FFFFFF', fontFamily: 'Montserrat-Medium' }}>{this.props.details.name}</Text>

                              <Text style={{ fontSize: 15, marginTop: 14, color: '#FFFFFF', lineHeight: 18, fontWeight: 'bold' }}>Description</Text>
                              <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'Montserrat-Medium', lineHeight: 18 }}>{this.props.details.description}</Text>

                              <Text style={{ fontSize: 15, marginTop: 14, color: '#FFFFFF', lineHeight: 18, fontWeight: 'bold' }}>Story</Text>
                              <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'Montserrat-Medium', lineHeight: 18 }}>{this.props.details.story}</Text>

                              <Text style={{ fontSize: 15, marginTop: 14, color: '#FFFFFF', lineHeight: 18, fontWeight: 'bold' }}>Expiration</Text>
                              <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'Montserrat-Medium', lineHeight: 18 }}>{moment(this.props.details.end_date).format('MMMM Do YYYY, h:mm:ss a')}</Text>

                              <Text style={{ fontSize: 15, marginTop: 14, color: '#FFFFFF', lineHeight: 18, fontWeight: 'bold' }}>Fine Print</Text>
                              <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'Montserrat-Medium', lineHeight: 18 }}>This offer is a {this.props.details.pricing} and it is valid from {moment(this.props.details.start_date).format('MMM Do YYYY')} to {moment(this.props.details.end_date).format('MMM Do YYYY')}. It's price is ${this.props.details.original_price} for ${this.props.details.sale_price}. The estimated value is ${this.props.details.perceived_value}</Text>
                            </View>
                          </Row>
                          <Row style={{ height: 104 }}>
                            <Grid>
                              <Col></Col>
                              <Col style={{ width: 165 }}>
                                {this.props.isLoading ?
                                  <View style={{ marginTop: 15 }}><Spinner /></View>
                                  :
                                  <TouchableHighlight style={{ borderRadius: 8 }} onPress={this._saveOfferToUser}>
                                    <LinearGradient
                                      start={{ x: 0.0, y: 0.25 }}
                                      end={{ x: 0.5, y: 1.0 }}
                                      locations={[0, 0.6, 1]}
                                      colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient}>
                                      <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 36, marginTop: 18 }}>Save Offer</Text>
                                    </LinearGradient>
                                  </TouchableHighlight>
                                }
                              </Col>
                              <Col></Col>
                            </Grid>
                          </Row>
                        </Grid>
                      </Row>
                      : null}

                    {/* LOCATION */}
                    {this.state.activeWindow == "1" ?
                      <Row>
                        <Grid>
                          <Row>
                            <ScrollView style={{ flex: 1, marginLeft: 15, marginRight: 16 }}>

                              <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: '#fff' }}>Location:</Text>
                              <Text style={{ marginTop: 5, fontSize: 15, color: '#fff' }}>{this.props.store.name}</Text>
                              <Text style={{ fontSize: 15, color: '#fff' }}>{this.props.store.address}, {this.props.store.city}, {this.props.store.state} {this.props.store.zipcode}</Text>
                              <Text style={{ fontSize: 15, color: '#0645AD' }} onPress={()=>this._call()}>{this.props.store.phone_number}</Text>

                              <View style={{ marginTop: 10, height: 156 }}>
                                <MapView
                                  style={{ flex: 1 }}
                                  initialRegion={{
                                    latitude: this.state.location.latitude,
                                    longitude: this.state.location.longitude,
                                    latitudeDelta: 2.2922,
                                    longitudeDelta: 2.2421
                                  }} >
                                  <MapView.Marker
                                    coordinate={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude }}
                                    title={this.props.store.name}
                                    description={this.props.store.address + ', ' + this.props.store.city + ', ' + this.props.store.state + this.props.store.zipcode}
                                  />
                                </MapView>
                              </View>

                              <Text style={{ marginTop: 10, fontSize: 15, fontFamily: 'Montserrat-Bold', color: '#FFFFFF' }}>Hours:</Text>
                              <Text style={{ marginTop: 7, fontSize: 15, color: '#FFFFFF' }}>Sunday: {this.props.store.hours[0]} </Text>
                              <Text style={{ fontSize: 15, color: '#fff' }}>Monday: {this.props.store.hours[1]}</Text>
                              <Text style={{ fontSize: 15, color: '#fff' }}>Tuesday: {this.props.store.hours[2]} </Text>
                              <Text style={{ fontSize: 15, color: '#fff' }}>Wednesday: {this.props.store.hours[3]}</Text>
                              <Text style={{ fontSize: 15, color: '#fff' }}>Thursday: {this.props.store.hours[4]}</Text>
                              <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Friday: {this.props.store.hours[5]}</Text>
                              <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Saturday: {this.props.store.hours[6]}</Text>

                              {this.props.isLoading ?
                                <View style={{ marginTop: 15 }}><Spinner /></View>
                                :
                                <TouchableHighlight underlayColor='rgb(11,148,150)' style={{ borderRadius: 8, marginBottom: 10 }} onPress={this._saveOfferToUser}>
                                  <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }}
                                    end={{ x: 0.5, y: 1.0 }}
                                    locations={[0, 0.6, 1]}
                                    colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient}>
                                    <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 36, marginTop: 18 }}>Save Offer</Text>
                                  </LinearGradient>
                                </TouchableHighlight>
                              }
                            </ScrollView>
                          </Row>
                        </Grid>
                      </Row>
                      : null}

                    {/* MEDIA */}
                    {this.state.activeWindow == "2" ?
                      <Row>
                        <Grid>
                          <Row>
                            <View style={{ flex: 1 }}>
                              {this.props.details.video_url !== "" ?
                                <Video source={{ uri: this.props.details.video_url }} useNativeControls={true} style={{ left: 18, width: 86.5, height: 86 }} />
                                : null}
                              <FlatList
                                data={this.state.images_array}
                                numColumns={3}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderRowItem}
                                contentContainerStyle={{ margin: 14 }}
                              />
                            </View>
                          </Row>
                          <Row style={{ height: 104 }}>
                            <Grid>
                              <Col></Col>
                              <Col style={{ width: 165 }}>
                                {this.props.isLoading ?
                                  <View style={{ marginTop: 15 }}><Spinner /></View>
                                  :
                                  <TouchableHighlight underlayColor='rgb(11,148,150)' style={{ borderRadius: 8 }} onPress={this._saveOfferToUser}>
                                    <LinearGradient
                                      start={{ x: 0.0, y: 0.25 }}
                                      end={{ x: 0.5, y: 1.0 }}
                                      locations={[0, 0.6, 1]}
                                      colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient}>
                                      <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 36, marginTop: 18 }}>Save Offer</Text>
                                    </LinearGradient>
                                  </TouchableHighlight>
                                }
                              </Col>
                              <Col></Col>
                            </Grid>
                          </Row>
                        </Grid>
                      </Row>
                      : null}

                    {/* SHARE */}
                    {this.state.activeWindow == "3" ?
                      <Row style={{ marginTop: 41.5 }}>
                        <Grid>
                          <Row>
                            <Grid>
                              <Col></Col>
                              <Col style={{ width: 165 }}>
                                <TouchableHighlight onPress={this.shareOnFacebook} underlayColor='rgb(11,148,150)' style={{ borderRadius: 8, alignSelf: 'center', }}>
                                  <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }}
                                    end={{ x: 0.5, y: 1.0 }}
                                    locations={[0, 0.6, 1]}
                                    colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient_share}>
                                    <Entypo name='facebook' size={40} color="#FFFFFF" style={{ marginLeft: 64, marginTop: 12 }} />
                                  </LinearGradient>
                                </TouchableHighlight>
                              </Col>
                              <Col></Col>
                            </Grid>
                          </Row>
                          <Row>
                            <Grid>
                              <Col></Col>
                              <Col style={{ width: 165 }}>
                                <TouchableHighlight onPress={this.shareOnTwitter} underlayColor='rgb(11,148,150)' style={{ borderRadius: 8 }}>
                                  <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }}
                                    end={{ x: 0.5, y: 1.0 }}
                                    locations={[0, 0.6, 1]}
                                    colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient_share}>
                                    <Entypo name='twitter' size={40} color="#FFFFFF" style={{ marginLeft: 64, marginTop: 12 }} />
                                  </LinearGradient>
                                </TouchableHighlight>
                              </Col>
                              <Col></Col>
                            </Grid>
                          </Row>
                          <Row>
                            <Grid>
                              <Col></Col>
                              <Col style={{ width: 165 }}>
                                <TouchableHighlight onPress={this.shareOnSMS} underlayColor='rgb(11,148,150)' style={{ borderRadius: 8 }}>
                                  <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }}
                                    end={{ x: 0.5, y: 1.0 }}
                                    locations={[0, 0.6, 1]}
                                    colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient_share}>
                                    <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 63, marginTop: 18 }}>Text</Text>
                                  </LinearGradient>
                                </TouchableHighlight>
                              </Col>
                              <Col></Col>
                            </Grid>
                          </Row>
                          <Row>
                            <Grid>
                              <Col></Col>
                              <Col style={{ width: 165 }}>
                                <TouchableHighlight onPress={this.shareOnEmail} underlayColor='rgb(11,148,150)' style={{ borderRadius: 8 }}>
                                  <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }}
                                    end={{ x: 0.5, y: 1.0 }}
                                    locations={[0, 0.6, 1]}
                                    colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient_share}>
                                    <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 57, marginTop: 18 }}>Email</Text>
                                  </LinearGradient>
                                </TouchableHighlight>
                              </Col>
                              <Col></Col>
                            </Grid>
                          </Row>
                        </Grid>
                      </Row>
                      : null}
                  </Grid>
                </Row>
              </Grid >
            </Row >
          </Grid >
          <Modal
            visible={this.state.showGallery}
            animationType={'fade'}
            onRequestClose={() => this._toggleGallery()}>
            <View style={{ flex: 1 }} >
              <Gallery
                style={{ flex: 1, backgroundColor: 'black' }}
                images={this.state.images_array}
              />
              <Button style={{ position: 'absolute', top: 15, left: 15 }} onPress={this._toggleGallery} ><Text>Close</Text></Button>
            </View>
          </Modal>
        </Container >
      );
    }
    else
      return null;

  }
}

function mapStateToProps(state, props) {
  return {
    store: state.OfferReducer.available_store,
    isLoading: state.OfferReducer.isFetching
  }
}

export default connect(mapStateToProps, { postOfferToUser, fetchOfferStore })(CardDetails)