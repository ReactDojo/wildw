
import React, { Component } from "react";
import { StyleSheet, FlatList, Text, Image, View, TouchableHighlight, Animated, Dimensions } from "react-native";
import PropTypes from "prop-types";
import styles from '../styles/usercard';
import dumpimage from '../images/dump.jpg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class OfferList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pan: this.props.offer.map((offer) => {
        return new Animated.ValueXY()
      })
    }

    this.gotocarddetails = this.gotocarddetails.bind(this);
  }

  _startAnimations = (cb) => {
    const animations = this.props.offer.map((item, index) => {
      return Animated.spring(this.state.pan[index], {
        tension: 2, frition: 3,
        toValue: {x: -Dimensions.get('window').width - 200, y: 0}
      });
    });
    Animated.stagger(150, animations).start();
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

  _renderItem = ({ item, index }) => {
    let image_content = <Image resizeMode='cover' source={{ uri: item.featured_image_url }} style={styles.listimage} />;
    if (this.props.randomoffer.isFetching) {
      image_content = <Image resizeMode='cover' source={dumpimage} style={styles.listimage} />;
    }
    return (
      <TouchableHighlight onPress={() => this.gotocarddetails(item)} key={index} underlayColor='rgb(2,139,141)'>
        <Animated.View style={[styles.listview, { right: -Dimensions.get('window').width - 200 }, { transform: this.state.pan[index].getTranslateTransform() }]}>
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
        </Animated.View>
      </TouchableHighlight>
    );
  };

  componentDidMount = () => {
    this._startAnimations();
  }

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

