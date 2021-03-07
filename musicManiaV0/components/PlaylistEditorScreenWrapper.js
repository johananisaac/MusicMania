import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import SelectOption from './SelectOption';

export default class PlaylistEditorScreenWrapper extends Component {
  state = {
    playlist_names: [],
  }

  async getName() {
    try{
      let playlistsTemp = await AsyncStorage.getItem("Playlist_names");
      if(playlistsTemp != null){
        this.setState({
          playlist_names: JSON.parse(playlistsTemp),
        });
      }
    }
    catch(err){
      alert(err);
    }

  }
  componentDidMount(){
    this.getName();
  }


  render(){
    this.playlist_names = this.state.playlist_names.map((item) => 
        <SelectOption name={item}/>
    );
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Tap the songs below to add them to the current playlist!
        </Text>
        <View style={styles.row}>
          {this.playlist_names}
          <SelectOption name='My Favorites' onPress={() => this.props.nav.navigate('Playlist')}/>
          <SelectOption name='Create New Playlist' onPress={() =>  this.props.nav.navigate('Playlist')}/>
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
  }
});
