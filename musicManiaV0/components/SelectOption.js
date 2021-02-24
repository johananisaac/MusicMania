import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


 
export default class SelectOption extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.onPress}
          style={styles.button}>
          <Text style={styles.container}>{this.props.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 10,
    width: 100,
    height: 100,
    backgroundColor: 'powderblue',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
