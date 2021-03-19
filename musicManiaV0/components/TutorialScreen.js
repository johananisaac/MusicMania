import * as React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';

// General purpose separator
const Separator = () => (
  <View style={CustomStyleSheet.separator} />
);

export default class TutorialScreen extends Component {
  render(){
    return (
      <View style={CustomStyleSheet.container}>
        <Text style={CustomStyleSheet.baseParagraph}>
          Interactive tutorial coming soon!
        </Text>
        <View style={CustomStyleSheet.containerRow}>
          <TouchableOpacity
              onPress={() => this.props.nav.navigate('Home')}
              style={CustomStyleSheet.button}>
              <Text style={CustomStyleSheet.buttonText}>Get Started!</Text>
          </TouchableOpacity>
        </View>
        <Separator />
      </View>
    )
  } 
}
