import * as React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';
import PlayButton from './PlayButton';

// General purpose separator
const Separator = () => (
  <View style={CustomStyleSheet.separator} />
);

export default class PlayScreen extends Component {
  render(){
    return (
      <View style={CustomStyleSheet.container}>
        <TouchableOpacity
            onPress={() => this.props.nav.navigate('Home')}
            style={CustomStyleSheet.buttonShort}>
            <Text style={CustomStyleSheet.shortButtonText}>Back to home!</Text>
        </TouchableOpacity>
        <PlayButton />
        <Separator />
      </View>
    )
  } 
}
