import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { TextInput } from 'react-native-gesture-handler';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);
const ThemeTextInput = createThemedComponent(TextInput);

export default class SelectSongScreen extends Component {
  state = {
    playlist: [],
    playlistName: '',
    EditPlaylist: 'False',
    oldPlaylistName: '',
  }
  setName(playlistname){
    this.state.playlistName = playlistname;
  }
  // save playlist
  async savePlaylist(destination) {
    if(this.state.playlistName == ''){
      alert("Name your playlist!");
    }
    else if(this.state.playlist.length == 0){
      alert("Playlist cannot be empty!");
    }
    else{
      try{
        if(this.state.EditPlaylist == "True"){
          let playlistsTemp = await AsyncStorage.getItem("Playlist_names");
          let playlists = JSON.parse(playlistsTemp);
          let index = playlists.indexOf(this.state.oldPlaylistName);
          playlists.splice(index, 1);
          playlists.push(this.state.playlistName.toString());
          await AsyncStorage.setItem("Playlist_names", JSON.stringify(playlists));
        }
        else{
          // set current Playlist
          await AsyncStorage.setItem("Current-Playlist", this.state.playlistName.toString());

          // await AsyncStorage.clear();
          let playlistsTemp = await AsyncStorage.getItem("Playlist_names");
          if(playlistsTemp == null){
            let playlists = [];
            playlists.push(this.state.playlistName.toString());
            await AsyncStorage.setItem("Playlist_names", JSON.stringify(playlists));
          }
          else{
            let playlists = JSON.parse(playlistsTemp);
            playlists.push(this.state.playlistName.toString());
            await AsyncStorage.setItem("Playlist_names", JSON.stringify(playlists));
          }
          await AsyncStorage.setItem(this.state.playlistName.toString(), JSON.stringify(this.state.playlist));
          // await AsyncStorage.clear();
        }
        this.props.nav.navigate(destination);
      }
      catch (err){
        alert(err);
      }
    }
  }

  addToPlaylist(name) {
    if(this.state.playlist.length < 5){
      this.setState({
        playlist: [...this.state.playlist, name]
      });
    }
  }

  removeFromPlaylist(id) {
    this.state.playlist.splice(id, 1);
    this.forceUpdate();
  }
  async deletePlaylist(destination){
    let playlistsTemp = await AsyncStorage.getItem("Playlist_names");
    let playlists = JSON.parse(playlistsTemp);
    let index = playlists.indexOf(this.state.oldPlaylistName);
    playlists.splice(index, 1);
    if(playlists == null){
      await AsyncStorage.removeItem("Playlist_names");
    }
    else {
      await AsyncStorage.setItem("Playlist_names", JSON.stringify(playlists));
    }
    this.props.nav.navigate(destination);
  }

  async componentDidMount(){
    let is_edit = await AsyncStorage.getItem("EditPlaylist");
    if(is_edit == "True"){
      let name = await AsyncStorage.getItem("currentPlaylist");
      this.state.playlistName = name;
      this.state.EditPlaylist = "True";
      // need to get the songs in playists
      this.forceUpdate();
    }
    else{
      // need to do
    }
  }

  render(){
    this.state.oldPlaylistName = this.state.playlistName;
    this.playlist = this.state.playlist.map((item, index) => 
        <Button style={CustomStyleSheet.styles.button} 
          key={index}
          onPress={() => this.removeFromPlaylist(index)}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>
            {item}
          </Theme.Text>
        </Button>
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
        <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          Tap the songs below to add them to the current playlist!
        </Theme.Text>
        <Theme.View style={CustomStyleSheet.styles.row}>
          <SelectOption name='Saxophone' onPress={() => this.addToPlaylist("Saxophone")}/>
          <SelectOption name='Piano' onPress={() => this.addToPlaylist("Piano")}/>
          <SelectOption name='Violin' onPress={() => this.addToPlaylist("Violin")}/>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.row}>
          <SelectOption name='Sample Song1' onPress={() => this.addToPlaylist("Sample Song1")}/>
          <SelectOption name='Sample Song2' onPress={() => this.addToPlaylist("Sample Song2")}/>
          <SelectOption name='Sample Song3' onPress={() => this.addToPlaylist("Sample Song3")}/>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.row}>
          <SelectOption name='My Song1' onPress={() => this.addToPlaylist("My Song1")}/>
          <SelectOption name='My Song2' onPress={() => this.addToPlaylist("My Song2")}/>
          <SelectOption name='My Song3' onPress={() => this.addToPlaylist("My Song3")}/>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.row}>
          <SelectOption name='Whoosh!' onPress={() => this.addToPlaylist("Whoosh!")}/>
          <SelectOption name='Bop!' onPress={() => this.addToPlaylist("Bop!")}/>
          <SelectOption name='Pow!' onPress={() => this.addToPlaylist("Pow!")}/>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.fullWidth}>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>Playlist</Theme.Text>
          <Theme.View>{this.playlist}</Theme.View>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.row}>
          {this.deleteButton}
          <SelectOption name='Play' onPress={() => this.savePlaylist('Play')}/>
          <SelectOption name='Record your own audio' onPress={() => this.savePlaylist('Record Own Song')}/>
        </Theme.View>
      </Theme.View>
      </ScrollView>
    )
  }
  
}
