'use strict';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../../styles/auth/index'
import auth_styles from '../../styles/auth/auth'

export class NavBar extends Component {
  render() {
    return (
      <View style={[{ height: 64, padding: 15, paddingTop: 20 }]}>
        <TouchableOpacity
          onPress={Actions.pop}
          style={{ height: 44, width: 44, justifyContent: "center" }}>
          <Ionicons name={"md-arrow-back"}
            size={24} style={{ height: 24 }} color={"rgb(83,182,249)"} />
        </TouchableOpacity>
      </View>
    );
  }
}

export class Button extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.btnContainer}>
        <View style={[styles.button, (this.props.bordered) && styles.bordered]}>
          <Text style={[styles.buttonText, (this.props.bordered) && styles.mainColor]}>
            {this.props.btnText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export class AuthTextInput extends Component {
  render() {
    return (
      <View style={{ borderWidth: 0, marginBottom: 5 }}>
        <View style={auth_styles.inputContainer}>
          <TextInput
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
            autoFocus={this.props.autoFocus}
            style={[auth_styles.textInput, {}]}
            value={this.props.value}
            secureTextEntry={this.props.secureTextEntry}
            autoCapitalize='none'
          />
        </View>
        {
          (this.props.error.length > 0) &&
          <Text style={[auth_styles.errorText]}>{this.props.error}</Text>
        }
      </View>
    );
  }
}