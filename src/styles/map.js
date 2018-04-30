import { StyleSheet } from 'react-native';
import App from './_constants';

module.exports = StyleSheet.create({

    container: {
        backgroundColor: App.BACKGROUND_COLOR,
    },

    header: App.HEADER_STYLES,

    logo: App.HEADER_LOGO_STYLES,
    mapTitle:{
        color: '#FFFFFF',
        fontSize: 24,
        marginBottom: 10,
        fontWeight: '500'
    },
    mapDetail:{
        color: '#FFFFFF',
        fontSize: 18
    }

});