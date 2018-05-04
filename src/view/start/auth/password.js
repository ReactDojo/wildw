import React, { Component } from 'react';
import { connect } from 'react-redux';
import { recover } from '../../../reducers/actions/index';
import { Authentication } from './index';

class Login extends Component {

  recover(data, errorCB) {
    this.props.recover(data, errorCB);
  }

  render() {
    return (
      <Authentication recover onPress={this.recover.bind(this)} />
    );
  }

};

export default connect(null, { recover })(Login);