import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { CustomStyleSheet } from '../styles';

 
export default class SelectOption extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View>
        <TouchableOpacity
          onPress={this.props.onPress}
          style={CustomStyleSheet.squareButton}>
          <Text style={CustomStyleSheet.buttonTextMedium}>{this.props.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
