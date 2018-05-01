import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import App from './_constants';

module.exports = StyleSheet.create({

    header: App.HEADER_STYLES,

    logo: App.HEADER_LOGO_STYLES,

    linearGradient: {
        marginTop: 9,
        paddingTop: 7,
        height: 50,
        width: 50,
        paddingLeft: 8,
        borderRadius: 25,
        marginLeft: 14,
    },

    container: {
        backgroundColor: '#000'
    },

    pop_cancel: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: '#FFFFFF',
        alignSelf: 'flex-end',
        marginTop: 64,
        marginRight: 16,
      },


});  