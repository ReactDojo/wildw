
import React, { Component } from "react";
import { StyleSheet, FlatList, Text, Image, View, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import styles from '../styles/usercard';
import dumpimage from '../images/dump.jpg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class OfferList extends Component {

  constructor(props) {
    super(props);
    this.gotocarddetails = this.gotocarddetails.bind(this);
  }

  gotocarddetails(value) {
    Actions.offerdetails({ 'details': value });
  }

  _keyExtractor = item => item.id;

  _renderEmptyItems = () => {
    return (
      <View style={styles.emptylistview}>
        <Text style={styles.itemcontent}>We're sorry.</Text>
        <Text style={styles.itemcontent}>There are not any content for this section available at this time.</Text>
      </View>
    );
  }

  _renderItem = ({ item }) => {
    let image_content = <Image resizeMode='cover' source={{ uri: item.featured_image_url }} style={styles.listimage} />;
    if (this.props.randomoffer.isFetching) {
      image_content = <Image resizeMode='cover' source={dumpimage} style={styles.listimage} />;
    }
    return (
      <TouchableHighlight onPress={() => this.gotocarddetails(item)} underlayColor='rgb(2,139,141)'>
        <View style={styles.listview}>
          <View style={styles.imageview}>
            {image_content}
          </View>
          <TouchableHighlight style={styles.controlbutton}>
            <Text style={styles.buttontext}>{item.pricing}</Text>
          </TouchableHighlight>
          <Text style={styles.itemcontent}>
            {item.name}
          </Text>
          <Text style={styles.itemtitle}>
            {item.story}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.props.offer}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={this._renderEmptyItems}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    randomoffer: state.OfferReducer
  }
}

export default connect(mapStateToProps, null)(OfferList);

