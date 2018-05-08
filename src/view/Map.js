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
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

class Map extends Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }} >
                            <MapView.Marker
                                coordinate={{ latitude: 38.7504664, longitude: -105.1757747 }}
                                title={'Wildwood Casino'}
                                description={'119 N Fifth St, Cripple Creek, CO 80813'}
                            />
                        </MapView>
                    </Row>
                    <Row style={{ height: 150, padding: 15 }}>
                        <Content >
                            <Row>
                                <Text style={styles.mapTitle}>Wildwood Casino</Text>
                            </Row>
                            <Row>
                                <Text style={styles.mapDetail}>119 N Fifth St, Cripple Creek, CO 80813</Text>
                            </Row>
                            <Row>
                                <Text style={styles.mapDetail}>(719) 244-9700</Text>
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
        map_url: ''
    }
}

export default connect(mapStateToProps)(Map);