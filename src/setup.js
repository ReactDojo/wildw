'use strict';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; //Import the store
import Main from './index';
import { Root } from "native-base";
export default class Groot extends Component {
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <Main />
                </Provider>
            </Root>
        );
    }
}
