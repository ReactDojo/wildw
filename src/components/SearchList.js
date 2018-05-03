
import React, { Component } from "react";
import { StyleSheet, FlatList, Text, Image, View, TouchableHighlight, Modal, TextInput, } from "react-native";
import PropTypes from "prop-types";
import { Container, Header, Content, Form, Item, Input, Title, Icon, Label, Button, Thumbnail, Right, Left, Body, Card, CardItem, List, ListItem } from 'native-base';
import styles from '../styles/usercard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dumpimage from '../images/dump.jpg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchOfferByCategory, fetchSearch } from '../redux/actions/OfferActions';
import { Col, Row, Grid } from "react-native-easy-grid";
class SearchList extends Component {
  constructor(props) {
    super(props);
    this.gotocarddetails = this.gotocarddetails.bind(this);
  }
  gotocarddetails(value) {
    this.props.close();
    this.props.fetchSearch(value);
  }
  _keyExtractor = item => item.name;

  _renderItem = ({ item }) => {
    return (
      <TouchableHighlight onPress={() => this.gotocarddetails(item.name)}>
        <View>
          <Text style={styles.searchlistitemtext}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <FlatList
        style = {{ flex: 1 }}
        data = {this.props.randomoffer.history}
        renderItem = {this._renderItem}
        keyExtractor = {this._keyExtractor}
        showsVerticalScrollIndicator = {false}
        showsHorizontalScrollIndicator = {false} />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    randomoffer: state.OfferReducer
  }
}

export default connect(mapStateToProps, {fetchSearch})(SearchList);
