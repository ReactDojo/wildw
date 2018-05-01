import React from 'react';
import { Font } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import Root from './src/setup';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
        'Montserrat-BlackItalic': require('./assets/fonts/Montserrat-BlackItalic.ttf'),
        'Montserrat-BoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
        'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat-ExtraBoldItalic': require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
        'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
        'Montserrat-ExtraLightItalic': require('./assets/fonts/Montserrat-ExtraLightItalic.ttf'),
        'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
        'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-LightItalic': require('./assets/fonts/Montserrat-LightItalic.ttf'),
        'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
        'Montserrat-ThinItalic': require('./assets/fonts/Montserrat-ThinItalic.ttf'),
      });
      this.setState({ fontLoaded: true });
      console.log('fonts are loaded');
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    if (this.state.fontLoaded) {
      return(
        <Root/>
      )
      
    }
    else
    return (
      <Root/>
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text:{
    fontFamily:'Montserrat-Bold',
  }
});
