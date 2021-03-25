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
  }
  setName(playlistname){
    this.state.playlistName = playlistname;
  }
  // save playlist
  async savePlaylist(destination) {
    if(this.state.playlistName == ''){
      alert("Name your playlist!");
    }
    else{
      try{
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

  render(){
    this.playlist = this.state.playlist.map((item, index) => 
        <Button style={CustomStyleSheet.styles.button} 
          key={index}
          onPress={() => this.removeFromPlaylist(index)}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>
            {item}
          </Theme.Text>
        </Button>
    );
    return (
      <ScrollView>
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
            Name Playlist:
          </Theme.Text>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <ThemeTextInput style={CustomStyleSheet.styles.paragraphInput} placeholder={"Playlist name here"} onChangeText={(text) => this.setName(text)}/>
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
          <SelectOption name='Play' onPress={() => this.savePlaylist('Play')}/>
          <SelectOption name='Record your own audio' onPress={() => this.savePlaylist('Record Own Song')}/>
        </Theme.View>
      </Theme.View>
      </ScrollView>
    )
  }
  
}
