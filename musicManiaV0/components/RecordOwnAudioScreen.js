import * as React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';

// General purpose separator
const Separator = () => (
  <View style={CustomStyleSheet.separator} />
);

export default class RecordOwnAudioScreen extends Component {
  render(){
    return (
      <View style={CustomStyleSheet.container}>
        <Separator />
        <View style={CustomStyleSheet.containerRow}>
            <TouchableOpacity
            onPress={() => this.props.nav.navigate('Playlist')}
            style={CustomStyleSheet.button}>
            <Text style={CustomStyleSheet.buttonText}>Back to song selection</Text>
            </TouchableOpacity>
        </View>
        <Separator />
        <View style={CustomStyleSheet.containerRow}>
            <TouchableOpacity
            style={CustomStyleSheet.button}>
            <Text style={CustomStyleSheet.buttonText}>Record your sound bite</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
  } 
}
