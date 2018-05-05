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
            stores: [],
            markers: []
        };

        this.getLatLong = this.getLatLong.bind(this);
        this.getMarkers = this.getMarkers.bind(this);
        //this.mapMarkers = this.mapMarkers.bind(this);
    }

    async componentDidMount() {
        this.getMarkers();
        // const data = this.props.fetchAllStore();
    }

    async _getLocationAsync(address) {
        let location = await Location.geocodeAsync(address);
        return location;
    }

    async getLatLong(store) {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        const address2 = store.address + ', ' + store.city + ', ' + store.state + store.zipcode;
        const location = await this._getLocationAsync(address2);
        return location;
    }


    async getMarkers() {
        const mark = this.props.all_stores.map(
            (store, index) => {
                const data = store;
                var obj = this.getLatLong(data);
                console.log('obj', obj);
                console.log('store', store);
                return Object.assign({store: store, coord: obj});
            }
        );

        
        Promise.all(mark).then((value) =>{
            console.log(value);
            var x = value.map(
                (store, index) => {
                    console.log('store ', store);
                    return (
                        <MapView.Marker
                            key={index + ' marker'}
                            coordinate={{ latitude: store.coord.latitude, longitude: store.coord.longitude }}
                            title={'Wildwood Casino'}
                            description={'119 N Fifth St, Cripple Creek, CO 80813'}
                        />
                    )
                }
            );
            this.setState({
                markers: x,
            });
        }
        )
        // this.setState({
        //     markers: value,
        // })
        //console.log(this.state.markers);
    }

    render() {
        //console.log(this.props.all_stores);

        
        var markbool = false;
        //var mark = this.mapMarkers();

        // if(mark.length > 0){
        //     markbool = true;
        // }
        //console.log('markers ', mark);

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
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: 38.7504664,
                                longitude: -105.1757747,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }} >
                            {/* <MapView.Marker
                                coordinate={{ latitude: 38.7504664, longitude: -105.1757747 }}
                                title={'Wildwood Casino'}
                                description={'119 N Fifth St, Cripple Creek, CO 80813'}
                            /> */}
                            {this.state.markers}
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