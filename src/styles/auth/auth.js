import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({

    // wrapper: {
    //   flex: 1,
    //   backgroundColor: '#fff'
    // },
    //
    // container: {
    //   flex: 1,
    //   padding: 15
    // },
    //
    // headerText: {
    //   fontWeight: "700",
    //   fontSize: 22,
    //   marginTop: 5,
    //   marginBottom: 5,
    //   color: "rgb(10,39,106)",
    // },
    //
    // errorText: {
    //   color: "red",
    //   marginBottom: 5,
    //   fontSize: 12,
    // },
    //
    // inputContainer: {
    //   borderBottomWidth: .5,
    //   borderColor: "#ccc",
    // },
    //
    // textInput: {
    //   fontSize: 14,
    //   height: 35,
    //   fontFamily: 'Helvetica Neue',
    //   color: "#333333"
    // },
    //
    // forgotText: {
    //   fontWeight: "500",
    //   fontSize: 15,
    //   marginTop: 15,
    //   marginBottom: 10,
    //   color: "rgb(10,39,106)",
    //   textAlign: "right"
    // }

    wrapper: {
        flex: 1
    },

    backgroundImageContainer: {
        flex: 1,
        width: 375,
        position: 'relative',
        resizeMode: 'cover'
    },

    loginContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 375,
        height: 166,
        backgroundColor: "#000000"
    },

    logoImage: {
        width: 163,
        height: 62
    },

    mainLoginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    loginForm: {
        display: 'flex',
        width: 345,
        height: 285,
        marginTop: 55,
        borderRadius: 15,
        backgroundColor: "#0b9496",
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },

    container: {
        padding: 18
    },

    emailInputLabel: {
        width: 327,
        height: 24,
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: -0.43,
        textAlign: "left",
        color: "#ffffff"
    },

    passwordInputLabel: {
        width: 327,
        height: 24,
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: -0.43,
        textAlign: "left",
        color: "#ffffff"
    },

    forgotText: {
        fontWeight: "500",
        fontSize: 15,
        marginTop: 15,
        marginBottom: 10,
        color: "rgb(10,39,106)",
        textAlign: "right"
    },

    textInput: {
        fontSize: 18,
        height: 22,
        fontFamily: "Montserrat",
        fontWeight: "500",
        color: "#ffffff",
        letterSpacing: -0.43,
        textAlign: "left",
        borderBottomWidth: 2,
        borderBottomColor: "#ffffff"
    },

    requestMessage: {
        display: 'flex',
        marginTop: 200
    },

    requestText: {
        width: 328,
        height: 22,
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "500",
        letterSpacing: -0.43,
        textAlign: "center",
        fontStyle: "normal",
        color: "#ffffff"
    }

});