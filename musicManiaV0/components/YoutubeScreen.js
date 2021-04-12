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

  addToPlaylist() {
    if(this.state.playlist.length < 5){
      this.setState({
        playlist: [...this.state.playlist, this.state.currentID]
      });
    }
  }

  removeFromPlaylist(id) {
    this.state.playlist.splice(id, 1);
    this.forceUpdate();
  }

  async deletePlaylist(destination){
    
    this.props.nav.navigate(destination);
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
      <Theme.View>
        <Button style={CustomStyleSheet.styles.button} 
          key={index}
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
          <SelectOption name='Play' onPress={() => this.props.nav.navigate('Play')}/>
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