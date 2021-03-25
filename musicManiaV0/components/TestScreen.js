/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React from 'react';
 import {
   AppRegistry,
   View,
   Text,
   TouchableOpacity,
   StatusBar,
 } from 'react-native';
 import { Component } from 'react';
 import Theme, {createThemedComponent } from 'react-native-theming';
 import SelectOption from './SelectOption';
 import {CustomStyleSheet} from '../styles';
 
//  const themes = [
//    createTheme({
//      backgroundColor: 'white',
//      textColor: 'black',
//      buttonColor: 'blue',
//      buttonText: 'white',
//      icon: require('../assets/icon.png'),
//      statusBar: 'dark-content',
//    }, 'Light'),
//    createTheme({
//      backgroundColor: 'black',
//      textColor: 'white',
//      buttonColor: 'yellow',
//      buttonText: 'black',
//      icon: require('../assets/icon.png'),
//      statusBar: 'light-content',
//    }, 'Dark'),
//  ];
 
//  const styles = createStyle({
//    container: {
//      flex: 1,
//      justifyContent: 'center',
//      alignItems: 'center',
//      backgroundColor: '@backgroundColor',
//    },
//    welcome: {
//      fontSize: 20,
//      textAlign: 'center',
//      margin: 10,
//      color: '@textColor',
//    },
//    instructions: {
//      textAlign: 'center',
//      color: '#888',
//      marginBottom: 5,
//    },
//    icon: {
//      width: 60,
//      height: 60,
//    },
//    // The generic button and button can be one, only separated
//    // here for testing purpose
//    genericButton: {
//      flex: 1,
//      margin: 10,
//      padding: 10,
//      borderRadius: 3,
//    },
//    button: {
//      backgroundColor: '@buttonColor',
//      alignItems: 'center',
//    },
//    buttonText: {
//      fontSize: 14,
//    },
//  });
 
 const Button = createThemedComponent(TouchableOpacity);
 const Bar = createThemedComponent(StatusBar, ['barStyle', 'backgroundColor']);
 
 
 export default class TutorialScreen extends Component {
  render(){
    return (
      <View>
        <Theme.View style={CustomStyleSheet.styles.container}>
        <SelectOption name='Black White Green' style={{color: "@buttonColor"}} onPress={() => CustomStyleSheet.themes[1].apply()}/>
        </Theme.View>
        <SelectOption name='Black White Green' style={{color: "@buttonColor"}} onPress={() => CustomStyleSheet.themes[1].apply()}/>
   <Theme.View style={CustomStyleSheet.styles.container}>
     <Bar barStyle="@statusBar" backgroundColor="@backgroundColor" />
     <Theme.ImageBackground source="@icon" style={CustomStyleSheet.styles.icon} />
     <Theme.Text style={CustomStyleSheet.styles.welcome}>
       React Native Theming Demo!
     </Theme.Text>
     <Theme.Text style={CustomStyleSheet.styles.instructions}>
       To experiment check app.js file
     </Theme.Text>
     <Text style={CustomStyleSheet.styles.instructions}>
       You can now create your themes using JSON. The styles declaration
       is directly compatible with StyleSheet.create. You just need to
       replace `StyleSheet.create` with `createStyle` and add your theme
       variables in the CustomStyleSheet.styles.
     </Text>
     <SelectOption name='Black White Green' style={{color: "@buttonColor"}} onPress={() => CustomStyleSheet.themes[1].apply()}/>
     <View style={{ flexDirection: 'row' }}>
       { CustomStyleSheet.themes.map(theme => (
         <Button key={theme.name} style={[CustomStyleSheet.styles.button, CustomStyleSheet.styles.genericButton]} onPress={() => theme.apply()}>
           <Theme.Text style={[CustomStyleSheet.styles.buttonText, { color: '@buttonText' }]}>{theme.name}</Theme.Text>
         </Button>
         ))
       }
     </View>
   </Theme.View>
   </View>

 )
} 
}
 
 AppRegistry.registerComponent('Foundation', () => ThemeDemo);