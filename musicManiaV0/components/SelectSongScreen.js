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
    currentPlaylist: '',
    oldPlaylistName: '',
  }

  setName(playlistname){
    this.state.playlistName = playlistname;
  }
  // save playlist
  async savePlaylist(destination) {
    let keywords = ['Playlist_names', 'EditPlaylist', 'currentPlaylist', 'Num_recordings', 'Players'];
    if(this.state.playlistName == ''){
      alert("Name your playlist!");
    }
    else if(this.state.playlist.length == 0){
      alert("Playlist cannot be empty!");
    }
    else if(keywords.indexOf(this.state.playlistName) > -1){
      alert("Invalid Playlist Name");
    }
    else{
      try{
        if(this.state.EditPlaylist == "False") {
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
        } else {
          let playlistsTemp = await AsyncStorage.getItem("Playlist_names");
          let playlists = JSON.parse(playlistsTemp);
          let index = playlists.indexOf(this.state.oldPlaylistName);
          playlists.splice(index, 1);
          playlists.push(this.state.playlistName.toString());
          await AsyncStorage.setItem("Playlist_names", JSON.stringify(playlists));
        }
        // set current Playlist
        await AsyncStorage.setItem("currentPlaylist", this.state.playlistName.toString());

        // await AsyncStorage.clear();
        
        await AsyncStorage.setItem(this.state.playlistName.toString(), JSON.stringify(this.state.playlist));
        // await AsyncStorage.clear();
        if (destination != ""){
          this.props.nav.navigate(destination);
        }
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
    // this._unsubscribe = this.props.nav.addListener('blur', () => {
    //   console.log("Save playlist from listener");
    //   this.savePlaylist("");
    // });
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
        placeholderTextColor= '#808080'
        onChangeText={(text) => this.setName(text)}/> ;
    if(this.state.EditPlaylist == "True"){
      this.deleteButton = 
        <SelectOption name='Delete Playlist' onPress={() => this.deletePlaylist('Home')}/>

    }
    
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