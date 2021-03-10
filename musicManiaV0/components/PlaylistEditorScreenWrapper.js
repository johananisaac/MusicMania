import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
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
    this.playlist_names = this.state.playlist_names.map((item, index) => 
        <SelectOption name={item} key={index} onPress={() => this.props.nav.navigate('Playlist')}/>
    );
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Choose a playlist to edit, or create a new one!
        </Text>
        <View>
          {this.playlist_names}
          <SelectOption name='My Favorites' onPress={() => this.props.nav.navigate('Playlist')}/>
          <SelectOption name='Create New Playlist' onPress={() =>  this.props.nav.navigate('Playlist')}/>
        </View>
      </View>
      </ScrollView>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
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
  	fontSize: 30,
  	textAlign: 'center',
    color: 'black'
  }
});
