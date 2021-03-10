import * as React from 'react';
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
          <Text style={styles.buttonText}>{this.props.name}</Text>
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
    margin: 5,
    // width: 100, // Phone
    // height: 100, // Phone
    width: 250, // iPad
    height: 250, // iPad
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonText: {
    // fontSize: 18, // Phone
    fontSize: 40, // iPad
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
});
