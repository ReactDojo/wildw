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
            markers: []
        };

        this.getLatLong = this.getLatLong.bind(this);
        this.getMarkers = this.getMarkers.bind(this);
    }

    async componentDidMount() {
        this.getMarkers();
    }

    async _getLocationAsync(address) {
        let location = await Location.geocodeAsync(address);
        return location;
    }

    async getLatLong(store) {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        const address2 = store.address + ', ' + store.city + ', ' + store.state;
        console.log(address2);
        const location = await this._getLocationAsync(address2);
        console.log('location ', location);
        return location;
    }

    async


    async getMarkers() {
        //console.log('all stores props ', this.props.all_stores);
        const promises = this.props.all_stores.map(
            async (store, index) => {
                try {
                    // console.log('index ',index);
                    // console.log('store', store);
                    var data = store;
                    // let coords = await this.getLatLong(store);
                    // Object.assign(store, { coords: coords[0] });
                    //console.log('data ', store);
                    //return store;
                    // this.setState({
                    //     markers: store,
                    // });


                    this.getLatLong(data).then(
                        (value) => {
                            //console.log('then ', value);
                            return value;
                        }
                    ).then(
                        (value) => {
                            const merge = Object.assign(data, {coord: value[0] });
                            //console.log('merge ', merge);
                            return merge;
                        }
                    ).then(
                        (value) => {
                            //console.log(value);
                            var joined = this.state.markers.concat(value);
                            //console.log('state update ', joined);
                            this.setState({
                                markers: joined
                            });
                        }
                    ).catch(
                        (e)=>{
                            console.log('error in then ', e);
                        }
                    )

                } catch (e) {
                    console.log('error ', e);
                }
            }
        );

        // const done = Promise.all(promises);

        // const temp = Promise.all(promises).then(
        //     (value)=>{
        //         console.log('value', value);
        //         return value;
        //     }
        // ).catch(
        //     (e)=>{
        //         console.log('error ', e);
        //     }
        // )

        // this.setState({
        //     markers: Promise.all(promises),
        // });

        

    }

    render() {
        var hasMarkers = false;
        const allMarkers = this.state.markers;
        if (allMarkers.length > 0)
            hasMarkers = true;

        console.log('all markers', allMarkers);

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
                            {hasMarkers ?
                                allMarkers.map((value, index) => {
                                    return (
                                        <MapView.Marker
                                            coordinate={{ latitude: value.coord.latitude, longitude: value.coord.longitude }}
                                            title={value.name}
                                            key = {index + "marker"}
                                            description={value.address + ', ' + value.city + ', ' + value.state + ', ' + value.zipcode}
                                        />
                                    )
                                })
                                : null
                            }
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
        map_url: '',
        all_stores: state.OfferReducer.all_stores
    }
}

export default connect(mapStateToProps, { fetchAllStore })(Map);