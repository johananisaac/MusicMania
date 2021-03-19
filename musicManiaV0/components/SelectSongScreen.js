import * as React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { TextInput } from 'react-native-gesture-handler';
import { CustomStyleSheet } from '../styles';

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
    try{
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
        <TouchableOpacity style={CustomStyleSheet.button} 
          key={index}
          onPress={() => this.removeFromPlaylist(index)}>
          <Text style={CustomStyleSheet.buttonTextMedium}>
            {item}
          </Text>
        </TouchableOpacity>
    );
    return (
      <ScrollView>
      <View style={CustomStyleSheet.container}>
        <View style={CustomStyleSheet.containerRow}>
          <Text style={CustomStyleSheet.baseParagraph}>
            Name Playlist:
          </Text>
        </View>
        <View style={CustomStyleSheet.containerRow}>
          <TextInput style={CustomStyleSheet.paragraphInput} placeholder={"Playlist name here"} onChangeText={(text) => this.setName(text)}/>
        </View>
        <Text style={CustomStyleSheet.baseParagraph}>
          Tap the songs below to add them to the current playlist!
        </Text>
        <View style={CustomStyleSheet.row}>
          <SelectOption name='Saxophone' onPress={() => this.addToPlaylist("Saxophone")}/>
          <SelectOption name='Piano' onPress={() => this.addToPlaylist("Piano")}/>
          <SelectOption name='Violin' onPress={() => this.addToPlaylist("Violin")}/>
        </View>
        <View style={CustomStyleSheet.row}>
          <SelectOption name='Sample Song1' onPress={() => this.addToPlaylist("Sample Song1")}/>
          <SelectOption name='Sample Song2' onPress={() => this.addToPlaylist("Sample Song2")}/>
          <SelectOption name='Sample Song3' onPress={() => this.addToPlaylist("Sample Song3")}/>
        </View>
        <View style={CustomStyleSheet.row}>
          <SelectOption name='My Song1' onPress={() => this.addToPlaylist("My Song1")}/>
          <SelectOption name='My Song2' onPress={() => this.addToPlaylist("My Song2")}/>
          <SelectOption name='My Song3' onPress={() => this.addToPlaylist("My Song3")}/>
        </View>
        <View style={CustomStyleSheet.row}>
          <SelectOption name='Whoosh!' onPress={() => this.addToPlaylist("Whoosh!")}/>
          <SelectOption name='Bop!' onPress={() => this.addToPlaylist("Bop!")}/>
          <SelectOption name='Pow!' onPress={() => this.addToPlaylist("Pow!")}/>
        </View>
        <View style={CustomStyleSheet.fullWidth}>
          <Text style={CustomStyleSheet.baseParagraph}>Playlist</Text>
          <View>{this.playlist}</View>
        </View>
        <View style={CustomStyleSheet.row}>
          <SelectOption name='Play' onPress={() => this.savePlaylist('Play')}/>
          <SelectOption name='Record your own audio' onPress={() => this.savePlaylist('Record Own Song')}/>
        </View>
      </View>
      </ScrollView>
    )
  }
  
}
