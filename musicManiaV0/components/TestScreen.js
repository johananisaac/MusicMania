/**
 * This is a test file for Music Mania views.
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

//  import * as React from 'react';
// import { Component } from 'react';
// import { ScrollView, AsyncStorage } from 'react-native';
// import SelectOption from './SelectOption';
// import { CustomStyleSheet } from '../styles';
// import Theme, {createThemedComponent } from 'react-native-theming';

// export default class SelectPlaylistScreen extends Component {

//   state = {
//     playlist_names: [],
//     rotatingSelectionReferences: [],
//     current_selection: 0,
//   }
  
//   makeTimer(){
//     setInterval(() => {
//       this.highlightElement((this.current_selection + 1)%this.playlist_names.length);
//       this.setState({
//         current_selection : (this.current_selection + 1)%this.playlist_names.length
//       });
//     }, 1000) // Make customizable
//   }

//   highlightElement(selectionId){
//     var ind = selectionId-1;
//     // if (ind < 0) ind = this.rotatingSelectionReferences.length;
//     // this.rotatingSelectionReferences[ind].current.changeHighlight("off");
//     // this.rotatingSelectionReferences[selectionId].current.changeHighlight("on");
//   }

//   async getName() {
//     try{
//       //await AsyncStorage.clear();
//       let playlistsTemp = await AsyncStorage.getItem("Playlist_names");
//       if(playlistsTemp != null){
//         this.setState({
//           playlist_names: JSON.parse(playlistsTemp),
//         });
//         this.playlist_names.forEach(element => {
//           this.rotatingSelectionReferences.push(React.createRef());
//         });
//       }
//     }
//     catch(err){
//       alert(err);
//     }
//   }

//   async editPlaylist(destination, name) {
//     try{
//       await AsyncStorage.setItem("EditPlaylist", "True");
//       await AsyncStorage.setItem("currentPlaylist", name);
//     }
//     catch (err){
//       alert(err);
//     }
//     this.props.nav.navigate(destination);
//   }

//   async newPlaylist(destination) {
//     try{
//       await AsyncStorage.setItem("EditPlaylist", "False");
//     }
//     catch (err){
//       alert(err);
//     }
//     this.props.nav.navigate(destination);
//   }

//   componentDidMount(){
//     this.getName();
//     this.forceUpdate();
//     this.makeTimer();
//   }

//   render(){
//     this.playlist_names = this.state.playlist_names.map((item, index) => 
//         <SelectOption name={item} key={index} onPress={() => this.editPlaylist('Playlist', item)}/>
//     );
//     return (
//       <ScrollView>
//       <Theme.View style={CustomStyleSheet.styles.container}>
//         <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
//           Choose a playlist to edit, or create a new one!
//         </Theme.Text>
//         <Theme.View>
//           {this.playlist_names}
//           <SelectOption name='Create New Playlist' onPress={() =>  this.newPlaylist('Playlist')}/>
//         </Theme.View>
//       </Theme.View>
//       </ScrollView>
//     )
//   } 
// }
