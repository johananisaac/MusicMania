import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SelectOption from './SelectOption';

export default class SelectScreenWrapper extends Component {
  state = {
    playlist: []
  }
  addToPlaylist(name) {
    if(this.state.playlist.length < 10){
      this.setState({
        playlist: [...this.state.playlist, name]
      });
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Tap the songs below to add them to the current playlist!
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <SelectOption name='Saxophone' onPress={() => this.addToPlaylist("Saxophone")}/>
          <SelectOption name='Piano' onPress={() => this.addToPlaylist("Piano")}/>
          <SelectOption name='Sample Song' onPress={() => this.addToPlaylist("Sample Song")}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <SelectOption name='Saxophone' onPress={() => this.addToPlaylist("Saxophone")}/>
          <SelectOption name='Piano' onPress={() => this.addToPlaylist("Piano")}/>
          <SelectOption name='Sample Song' onPress={() => this.addToPlaylist("Sample Song")}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <SelectOption name='Saxophone' onPress={() => this.addToPlaylist("Saxophone")}/>
          <SelectOption name='Piano' onPress={() => this.addToPlaylist("Piano")}/>
          <SelectOption name='Sample Song' onPress={() => this.addToPlaylist("Sample Song")}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <SelectOption name='Saxophone' onPress={() => this.addToPlaylist("Saxophone")}/>
          <SelectOption name='Piano' onPress={() => this.addToPlaylist("Piano")}/>
          <SelectOption name='Sample Song' onPress={() => this.addToPlaylist("Sample Song")}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <SelectOption name='Saxophone' onPress={() => this.addToPlaylist("Saxophone")}/>
          <SelectOption name='Piano' onPress={() => this.addToPlaylist("Piano")}/>
          <SelectOption name='Sample Song' onPress={() => this.addToPlaylist("Sample Song")}/>
        </View>
        <Text>
          Playlist: {this.state.playlist.join(", ")}
        </Text>
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
    // margin: 24,
    // marginTop: 0,
    // fontSize: 14,
    // fontWeight: 'bold',
    // textAlign: 'center',
  },
});
