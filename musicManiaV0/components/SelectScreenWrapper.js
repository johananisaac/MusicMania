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
    this.setState({
      playlist: [...this.state.playlist, name]
    });
  }
  render(){
    return (
      <View style={styles.container}>
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
        <Text>
          Playlist: {this.state.playlist}
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
  row: {
    flexDirection: 'row',
    marginBottom: '2%',
  },
});
