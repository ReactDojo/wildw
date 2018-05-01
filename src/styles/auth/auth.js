import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },

  container: {
    flex: 1,
    padding: 15
  },

  headerText: {
    fontWeight: "700",
    fontSize: 22,
    marginTop: 5,
    marginBottom: 5,
    color: "rgb(10,39,106)",
  },

  errorText: {
    color: "red",
    marginBottom: 5,
    fontSize: 12,
  },

  inputContainer: {
    borderBottomWidth: .5,
    borderColor: "#ccc",
  },

  textInput: {
    fontSize: 14,
    height: 35,
    fontFamily: 'Helvetica Neue',
    color: "#333333"
  },

  forgotText: {
    fontWeight: "500",
    fontSize: 15,
    marginTop: 15,
    marginBottom: 10,
    color: "rgb(10,39,106)",
    textAlign: "right"
  }

});