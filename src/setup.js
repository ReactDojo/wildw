'use strict';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; //Import the store
import Main from './index';
import { Root } from "native-base";
import { Font } from 'expo';

export default class Groot extends Component {
    async componentDidMount() {
        try {
            await Font.loadAsync({
                'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
                'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
                'Montserrat-BlackItalic': require('../assets/fonts/Montserrat-BlackItalic.ttf'),
                'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
                'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
                'Montserrat-ExtraBoldItalic': require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
                'Montserrat-ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
                'Montserrat-ExtraLightItalic': require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
                'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
                'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
                'Montserrat-LightItalic': require('../assets/fonts/Montserrat-LightItalic.ttf'),
                'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
                'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
                'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
                'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
                'Montserrat-SemiBoldItalic': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
                'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
                'Montserrat-ThinItalic': require('../assets/fonts/Montserrat-ThinItalic.ttf'),
            });
        } catch (error) {
            console.log('Error loading fonts', error);
        }
    }

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
