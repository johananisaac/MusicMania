import * as React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';

// General purpose separator
const Separator = () => (
  <View style={CustomStyleSheet.separator} />
);

export default class RecordPlayScreen extends Component {
  render(){
    return (
      <View style={CustomStyleSheet.container}>
        <Text style={CustomStyleSheet.baseParagraph}>
          Record
        </Text>
        <View style={CustomStyleSheet.containerRow}>
            <TouchableOpacity
            onPress={() => this.props.nav.navigate('Play Options')}
            style={CustomStyleSheet.button}>
            <Text style={CustomStyleSheet.buttonText}>Back to play options</Text>
            </TouchableOpacity>
        </View>
        <Separator />
        <View style={CustomStyleSheet.containerRow}>
          <TouchableOpacity
              // onPress={}
              style={CustomStyleSheet.button}>
              <Text style={CustomStyleSheet.buttonText}>Record your song!</Text>
          </TouchableOpacity>
        </View>
        <Separator />
      </View>
    )
  } 
}
