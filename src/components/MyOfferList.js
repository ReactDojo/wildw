
import React, { Component } from "react";
import { StyleSheet, FlatList, Text, Image, View, TouchableHighlight, Modal } from "react-native";
import PropTypes from "prop-types";
import styles from '../styles/myoffer';
import dumpimage from '../images/dump.jpg';
import { Actions } from 'react-native-router-flux';
import barcodeimage from '../images/barcode.png';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import Barcode from 'react-native-barcode-builder';
import moment from 'moment';
import SVGImage from 'react-native-remote-svg'

class MyOfferList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      available_offers: this.props.available_offers.filter(offer => offer.redeemed == false),
      popupWindow: "0",
      details_name: '',
      details_description: '',
      details_barcode: '',
      details: {}
    }

  }

  openModal(item) {
    this.setState({
      modalVisible: true,
      details: item
    });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => {
    return (
      <TouchableHighlight underlayColor='rgb(11,148,150)' onPress={() => this.openModal(item)} style={styles.listview} >
        <View>
          <Text style={styles.listtitletext}>{item.name}</Text>
          <Text style={styles.listtimetext}>5 pm today</Text>
          <Text style={styles.listcontenttext}>{item.story}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.available_offers}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={this.closeModal}
        >
          <Grid style={{ backgroundColor: '#000000' }}>
            <Row style={{ height: 113 }}>
              <Grid>
                <Col>
                  <TouchableHighlight onPress={() => this.setState({ popupWindow: "0" })} style={this.state.popupWindow == "0" ? styles.popcontrolbutton_left : styles.popcontrolbutton_left_deactivate}>
                    <Text style={styles.buttontext}>Offer Code</Text>
                  </TouchableHighlight>
                </Col>
                <Col>
                  <TouchableHighlight onPress={() => this.setState({ popupWindow: "1" })} style={this.state.popupWindow == "1" ? styles.popcontrolbutton_right : styles.popcontrolbutton_right_deactive}>
                    <Text style={styles.buttontext}>Information</Text>
                  </TouchableHighlight>
                </Col>
              </Grid>
            </Row>
            <Row>
              {this.state.popupWindow == "0" ?
                <Grid>
                  <Row>
                    <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                      <View style={{ backgroundColor: '#fff' }}>
                        <SVGImage style={{ width: 250, height: 250 }} source={{ uri: this.props.qr_code.url }} />
                      </View>
                      <Text style={{ color: '#fff', marginTop: 10, textAlign: 'center' }}>{this.props.qr_code.key}</Text>
                    </View>
                  </Row>
                  <Row>
                    <View style={{ marginTop: 50 }}>
                      <Text style={styles.barcontente_text}>By having an agent scan this Offer Code you are redeeming this offer and it will no longer be valid.</Text>
                      <Text style={styles.barhelp_text}>Help</Text>
                      <Text style={styles.barhelpct}>Lorem Imspum Bar elit. Sed gravida dolor nec tortor condimentum, et tincidunt arcu eleifend.</Text>
                      <Text style={styles.barcalltext}>For help call: 290-123-9010</Text>
                    </View>
                  </Row>
                </Grid>
                : null}
              {this.state.popupWindow == "1" ?
                <View><Text style={styles.pop_bigtext}>Offer Information</Text>
                  <Text style={styles.pop_titletext}>{this.state.details.name}</Text>
                  <Text style={styles.pop_subtitle}>Description</Text>
                  <Text style={styles.pop_contente}>{this.state.details.description}</Text>
                  <Text style={styles.pop_subtitle}>Story</Text>
                  <Text style={styles.pop_contente}>{this.state.details.story}</Text>
                  <Text style={styles.pop_subtitle}>Expiration</Text>
                  <Text style={styles.pop_contente}>{moment(this.state.details.end_date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                  <Text style={styles.pop_subtitle}>Fine Print</Text>
                  <Text style={styles.pop_contente}>This offer is a {this.state.details.pricing} and it is valid from {moment(this.state.details.start_date).format('MMM Do YYYY')} to {moment(this.state.details.end_date).format('MMM Do YYYY')}. It's price is ${this.state.details.original_price} for ${this.state.details.sale_price}. The estimated value is ${this.state.details.perceived_value}</Text>
                  <Text style={styles.pop_where}>Where</Text>
                  <Text style={styles.pop_wherecontent}>Lorem Imspum Bar elit. Sed gravida dolor nec tortor condimentum, et tincidunt arcu eleifend.</Text>
                  <Text style={styles.pop_phone}>For help call: 290-123-9010</Text>
                </View>
                : null}
            </Row>
            <Row style={{ height: 100 }}>
              <Grid>
                <Col>
                  <TouchableHighlight onPress={() => this.closeModal()}>
                    <Text style={styles.pop_cancel}>Cancel</Text>
                  </TouchableHighlight>
                </Col>
              </Grid>
            </Row>
          </Grid>
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    available_offers: state.OfferReducer.available_offers,
    qr_code: state.OfferReducer.qr_code
  }
}
export default connect(mapStateToProps, null)(MyOfferList);
