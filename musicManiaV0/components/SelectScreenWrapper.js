import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';
import { TextInput } from 'react-native-gesture-handler';

export default class SelectScreenWrapper extends Component {
  state = {
    playlist: [],
    playlistName: '',
  }
  setName(playlistname){
    this.state.playlistName = playlistname;
  }
  // save playlist
  async savePlaylist() {
    try{
      //await AsyncStorage.clear();
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
      //await AsyncStorage.clear();
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
        <TouchableOpacity style={styles.playlistItem} 
          key={index}
          onPress={() => this.removeFromPlaylist(index)}>
          <Text style={styles.playlistText}>
            {item}
          </Text>
        </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Name Playlist:
        </Text>
        <TextInput style={styles.input} onChangeText={(text) => this.setName(text)}/>
        <Text style={styles.paragraph}>
          Tap the songs below to add them to the current playlist!
        </Text>
        <View style={styles.row}>
          <SelectOption name='Saxophone' onPress={() => this.addToPlaylist("Saxophone")}/>
          <SelectOption name='Piano' onPress={() => this.addToPlaylist("Piano")}/>
          <SelectOption name='Violin' onPress={() => this.addToPlaylist("Violin")}/>
        </View>
        <View style={styles.row}>
          <SelectOption name='Sample Song1' onPress={() => this.addToPlaylist("Sample Song1")}/>
          <SelectOption name='Sample Song2' onPress={() => this.addToPlaylist("Sample Song2")}/>
          <SelectOption name='Sample Song3' onPress={() => this.addToPlaylist("Sample Song3")}/>
        </View>
        <View style={styles.row}>
          <SelectOption name='My Song1' onPress={() => this.addToPlaylist("My Song1")}/>
          <SelectOption name='My Song2' onPress={() => this.addToPlaylist("My Song2")}/>
          <SelectOption name='My Song3' onPress={() => this.addToPlaylist("My Song3")}/>
        </View>
        <View style={styles.row}>
          <SelectOption name='Whoosh!' onPress={() => this.addToPlaylist("Whoosh!")}/>
          <SelectOption name='Bop!' onPress={() => this.addToPlaylist("Bop!")}/>
          <SelectOption name='Pow!' onPress={() => this.addToPlaylist("Pow!")}/>
        </View>
        <View style={styles.playlist}>
          <Text style={styles.paragraph}>Playlist</Text>
          <View style={styles.playlist}>{this.playlist}</View>
        </View>
        <View>
          <SelectOption name='Save Playlist!' onPress={() => this.savePlaylist()}/>
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  row: {
    flexDirection: 'row',
  },
  playlist: {
    width: 320,
  },
  playlistItem: {
  	maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
  },
  playlistText: {
  	fontSize: 20,
  	textAlign: 'center',
    color: 'black'
  },
  input: {
    borderColor: 'white',
    alignSelf:"stretch",
    backgroundColor: 'white'
  }
});
