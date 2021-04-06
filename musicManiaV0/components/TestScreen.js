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
