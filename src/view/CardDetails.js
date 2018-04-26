import React, { Component } from 'react';
import { StyleSheet, Image, TouchableHighlight, FlatList, Dimensions, Modal, Platform } from 'react-native';
import GridView from "react-native-easy-grid-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import { Container, Header, Content, Tab, Tabs, TabHeading, Form, Item, Input, Label, Button, Text, Thumbnail, Icon, Right, Left, Body, View, Card, CardItem, List, ListItem } from 'native-base';
import dumpimage from '../images/dump.jpg';
import logoimage from '../images/logoimage.png';
import styles from '../styles/carddetails';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Gallery from 'react-native-image-gallery';
import HeaderBar from '../components/HeaderBar';
import Feather from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');
const equalWidth = (width - 116) / 3;

export default class CardDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      activeWindow: "0",
      showGallery: false,
      images_array: [
        { source: { uri: 'https://www.photographymad.com/files/images/grass-close-up.jpg' } },
        { source: { uri: 'https://www.photographymad.com/files/images/grass-close-up.jpg' } },
        { source: { uri: 'https://www.photographymad.com/files/images/grass-close-up.jpg' } },
        { source: { uri: 'https://www.photographymad.com/files/images/grass-close-up.jpg' } },
        { source: { uri: 'https://www.photographymad.com/files/images/grass-close-up.jpg' } }
      ],
      images_index: 0
    }

    this._openGallery = this._openGallery.bind(this);
    this._toggleGallery = this._toggleGallery.bind(this);
  }

  _keyExtractor = (item, index) => index.toString();

  _toggleGallery() {
    this.setState({ showGallery: !this.state.showGallery });
  }

  _openGallery() {
    this._toggleGallery();
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

  render() {
    const image_url_array = this.props.details.image_urls;
    const image_urls = image_url_array[0];
    let image_content = <Image resizeMode='cover' source={{ uri: image_urls }} style={styles.listimage} />;
    return (
      <Container style={styles.container}>
        <Grid>
          <Row style={{ height: 74 }}>
            <Content style={styles.header}>
              <Grid>
                <Col>
                  {(Platform.OS === 'ios') ?
                    <TouchableHighlight onPress={() => { Actions.pop(); }}>
                      <LinearGradient
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.6, 1]}
                        colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']}
                        style={styles.back_button}>
                        <Feather name='chevron-left' size={35} color="#FFFFFF" />
                      </LinearGradient>
                    </TouchableHighlight>
                    : null}
                </Col>
                <Col>
                  <Image source={logoimage} style={styles.logo} />
                </Col>
                <Col></Col>
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
                  {this.state.activeWindow == "0" ?
                    <Row>
                      <Grid>
                        <Row>
                          <View style={{ flex: 1, marginLeft: 19, marginRight: 25 }}><Text style={{ fontSize: 30, color: '#FFFFFF', fontFamily: 'Montserrat-Medium' }}>{this.props.details.name}</Text>
                            <Text style={{ fontSize: 15, marginTop: 14, color: '#FFFFFF', lineHeight: 18 }}>Description</Text>
                            <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'Montserrat-Medium', lineHeight: 18 }}>{this.props.details.description}</Text>
                          </View>
                        </Row>
                        <Row style={{ height: 104 }}>
                          <Grid>
                            <Col></Col>
                            <Col style={{ width: 165 }}>
                              <TouchableHighlight style={{ borderRadius: 8 }}>
                                <LinearGradient
                                  start={{ x: 0.0, y: 0.25 }}
                                  end={{ x: 0.5, y: 1.0 }}
                                  locations={[0, 0.6, 1]}
                                  colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient}>
                                  <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 36, marginTop: 18 }}>Save Offer</Text>
                                </LinearGradient>
                              </TouchableHighlight>
                            </Col>
                            <Col></Col>
                          </Grid>
                        </Row>
                      </Grid>
                    </Row>
                    : null}
                  {this.state.activeWindow == "1" ?
                    <Row>
                      <Grid>
                        <Row>
                          <View style={{ flex: 1, marginLeft: 15, marginRight: 16 }}>
                            <View style={{ height: 156, backgroundColor: '#FFFFFF' }}></View>
                            <Text style={{ marginTop: 10, fontSize: 15, fontFamily: 'Montserrat-Bold', color: '#FFFFFF' }}>Where</Text>
                            <Text style={{ marginTop: 10, fontSize: 14, fontFamily: 'Montserrat-Medium', color: '#FFFFFF' }}>Lorem Imspum Bar elit. Sed gravida dolor nec tortor condimentum, et tincidunt arcu eleifend.</Text>
                            <Text style={{ marginTop: 30, fontSize: 14, color: '#FFFFFF', fontFamily: 'Montserrat-Medium' }}>For help call: 290-123-9010</Text>
                          </View>
                        </Row>
                        <Row style={{ height: 104 }}>
                          <Grid>
                            <Col></Col>
                            <Col style={{ width: 165 }}>
                              <TouchableHighlight underlayColor='rgb(11,148,150)' style={{ borderRadius: 8 }}>
                                <LinearGradient
                                  start={{ x: 0.0, y: 0.25 }}
                                  end={{ x: 0.5, y: 1.0 }}
                                  locations={[0, 0.6, 1]}
                                  colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient}>
                                  <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 36, marginTop: 18 }}>Save Offer</Text>
                                </LinearGradient>
                              </TouchableHighlight>
                            </Col>
                            <Col></Col>
                          </Grid>
                        </Row>
                      </Grid>
                    </Row>
                    : null}
                  {this.state.activeWindow == "2" ?
                    <Row>
                      <Grid>
                        <Row>
                          <View style={{ flex: 1 }}>
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
                              <TouchableHighlight underlayColor='rgb(11,148,150)' style={{ borderRadius: 8 }}>
                                <LinearGradient
                                  start={{ x: 0.0, y: 0.25 }}
                                  end={{ x: 0.5, y: 1.0 }}
                                  locations={[0, 0.6, 1]}
                                  colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']} style={styles.linearGradient}>
                                  <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 36, marginTop: 18 }}>Save Offer</Text>
                                </LinearGradient>
                              </TouchableHighlight>
                            </Col>
                            <Col></Col>
                          </Grid>
                        </Row>
                      </Grid>
                    </Row>
                    : null}
                  {this.state.activeWindow == "3" ?
                    <Row style={{ marginTop: 41.5 }}>
                      <Grid>
                        <Row>
                          <Grid>
                            <Col></Col>
                            <Col style={{ width: 165 }}>
                              <TouchableHighlight underlayColor='rgb(11,148,150)' style={{ borderRadius: 8, alignSelf: 'center', }}>
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
                              <TouchableHighlight underlayColor='rgb(11,148,150)' style={{ borderRadius: 8 }}>
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
                              <TouchableHighlight underlayColor='rgb(11,148,150)' style={{ borderRadius: 8 }}>
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
                              <TouchableHighlight underlayColor='rgb(11,148,150)' onPress={this.testingapi} style={{ borderRadius: 8 }}>
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
            </Grid>
          </Row>
        </Grid>
        <Modal
          visible={this.state.showGallery}
          onRequestClose={() => this._toggleGallery()}>
          <Container style={styles.container}>
            <Grid>
              <Row style={{ height: 74 }}>
                <Content style={styles.header}>
                  <Grid>
                    <Col>
                      {(Platform.OS === 'ios') ?
                        <TouchableHighlight onPress={this._toggleGallery}>
                          <LinearGradient
                            start={{ x: 0.0, y: 0.25 }}
                            end={{ x: 0.5, y: 1.0 }}
                            locations={[0, 0.6, 1]}
                            colors={['rgb(1,123,125)', 'rgb(3,55,55)', 'rgb(3,35,35)']}
                            style={styles.back_button}>
                            <Feather name='cross' size={35} color="#FFFFFF" />
                          </LinearGradient>
                        </TouchableHighlight>
                        : null}
                    </Col>
                    <Col>
                      <Image source={logoimage} style={styles.logo} />
                    </Col>
                    <Col></Col>
                  </Grid>
                </Content>
              </Row>
              <Row>
                <Gallery
                  style={{ flex: 1, backgroundColor: 'black' }}
                  images={this.state.images_array}
                />
              </Row>
            </Grid>
          </Container>
        </Modal>
      </Container>
    );
  }
}
