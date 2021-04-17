import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { TextInput } from 'react-native-gesture-handler';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';

const Button = createThemedComponent(TouchableOpacity);
const ThemeTextInput = createThemedComponent(TextInput);

export default class YoutubeScreen extends Component {
  state = {
    playlist: [],
    playlistName: '',
    EditPlaylist: 'False',
    currentPlaylist: '',
    oldPlaylistName: '',
    currentID: '',
  }
  // setting the playlist title
  setName(playlistname){
    this.state.playlistName = playlistname;
  }
  // setting the ID
  setID(ID){
    this.state.currentID = ID;
  }
  // adding video to the playlist
  addToPlaylist() {
    if(this.state.playlist.length < 5){
      this.setState({
        playlist: [...this.state.playlist, this.state.currentID]
      });
    }
  }
  // remove video from playllist
  removeFromPlaylist(id) {
    this.state.playlist.splice(id, 1);
    this.forceUpdate();
  }
  // delete playlist
  async deletePlaylist(destination){ 
    let playlistsTemp = await AsyncStorage.getItem("Youtube_Playlist_names");
    let playlists = JSON.parse(playlistsTemp);
    let index = playlists.indexOf(this.state.oldPlaylistName);
    playlists.splice(index, 1);
    if(playlists == null){
      await AsyncStorage.removeItem("Youtube_Playlist_names");
    }
    else {
      await AsyncStorage.setItem("Youtube_Playlist_names", JSON.stringify(playlists));
    }
    this.props.nav.navigate(destination);
  }

  // saving playist
  async savePlaylist(destination) {
    let keywords = ['Playlist_names', 'EditPlaylist', 'currentPlaylist', 'Num_recordings', 'Players', 'Youtube_Playlist_names'];
    // check if playlist name is not in the names of other playlist list
    let playlistTemp2 = await AsyncStorage.getItem("Playlist_names");
    let playlists2 = [];
    if(playlistTemp2 != null){
      playlists2 = JSON.parse(playlistTemp2);
      keywords = keywords.concat(playlists2);
    }
    // get list of youtube playlist names
    let playlistTemp = await AsyncStorage.getItem("Youtube_Playlist_names");
    let playlists = [];
    if(playlistTemp != null){
      playlists = JSON.parse(playlistTemp);
      keywords = keywords.concat(playlists)
    }
    if(this.state.playlistName == ''){
      alert("Name your playlist!");
    }
    else if(this.state.playlist.length == 0){
      alert("Playlist cannot be empty!");
    }
    else if(keywords.indexOf(this.state.playlistName) > -1 && this.state.EditPlaylist == 'False'){
      alert("Invalid Playlist Name");
    }
    else if(keywords.indexOf(this.state.playlistName) > -1 && this.state.EditPlaylist == 'True' && this.state.oldPlaylistName != this.state.playlistName){
      alert("Invalid Playlist Name");
    }
    else{
      if(playlistTemp2 != null && playlists2.indexOf(this.state.playlistName) > -1){
        alert("Invalid Playlist Name!");
      }
      else{
        try{
          // check Edit_Playlist to see if creating new playlist or editing
          if(this.state.EditPlaylist == "False"){
            // push playlist name to list
            playlists.push(this.state.playlistName.toString());
            // update storage
            await AsyncStorage.setItem("Youtube_Playlist_names", JSON.stringify(playlists));
          }
          // editing a playlist
          else{
            let index = playlists.indexOf(this.state.oldPlaylistName);
            playlists.splice(index, 1);
            playlists.push(this.state.playlistName.toString());
            await AsyncStorage.setItem("Youtube_Playlist_names", JSON.stringify(playlists));
          }
          // set current Playlist
          await AsyncStorage.setItem("currentPlaylist", this.state.playlistName.toString());
          // match playlist name with list of songs
          await AsyncStorage.setItem(this.state.playlistName.toString(), JSON.stringify(this.state.playlist));
          this.props.nav.navigate(destination);
        }
        catch(err){
          alert(err);
        }
      }
    }
  }

  async componentDidMount(){
    this.state.EditPlaylist = await AsyncStorage.getItem("EditPlaylist");
    if(this.state.EditPlaylist == "True"){
      let name = await AsyncStorage.getItem("currentPlaylist");
      this.state.currentPlaylist = name;
      this.setName(name);
      let current_playlist = await AsyncStorage.getItem(this.state.playlistName.toString());
      this.state.playlist = JSON.parse(current_playlist);
      this.forceUpdate();
    }
    else{
      this.setName("");
      this.state.playlist = [];
      this.state.currentPlaylist = '';
    }
  }

  render(){
    this.state.oldPlaylistName = this.state.playlistName;
    this.playlist = this.state.playlist.map((item, index) =>
      <Theme.View key={index}>
        <Button style={CustomStyleSheet.styles.button} 
          onPress={() => this.removeFromPlaylist(index)}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>
            Remove
          </Theme.Text>
        </Button>
        <YoutubePlayer
          height={300}
          videoId={item}
        />
      </Theme.View>
    );
    this.showPlaylistName =
      <ThemeTextInput style={CustomStyleSheet.styles.paragraphInput} 
        placeholder={this.state.playlistName}
        onChangeText={(text) => this.setName(text)}/> ;
    if(this.state.EditPlaylist == "True"){
      this.deleteButton = 
        <SelectOption name='Delete Playlist' onPress={() => this.deletePlaylist('Home')}/>

    };
    
    return (
      <ScrollView>
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
            Name Playlist:
          </Theme.Text>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          {this.showPlaylistName}
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
            Youtube Video ID:
          </Theme.Text>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <ThemeTextInput style={CustomStyleSheet.styles.paragraphInput} 
            placeholder="Type Video ID here!"
            onChangeText={(text) => this.setID(text)}/>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.row}>
          {this.deleteButton}
          <SelectOption name='Add' onPress={() => this.addToPlaylist()}/>
          <SelectOption name='Save and Play' onPress={() => this.savePlaylist('YoutubePlay')}/>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.fullWidth}>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>Playlist</Theme.Text>
          <Theme.View>{this.playlist}</Theme.View>
        </Theme.View>
      </Theme.View>
      </ScrollView>
    )
  }
  
}