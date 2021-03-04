import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SelectOption from './SelectOption';

export default class PlaylistEditorScreenWrapper extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Tap the songs below to add them to the current playlist!
        </Text>
        <View style={styles.row}>
          <SelectOption name='My Favorites' onPress={() => this.props.nav.navigate('Playlist')}/>
          <SelectOption name='Playlist 2' onPress={() =>  this.props.nav.navigate('Playlist')}/>
          <SelectOption name='Playlist 3' onPress={() =>  this.props.nav.navigate('Playlist')}/>
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
