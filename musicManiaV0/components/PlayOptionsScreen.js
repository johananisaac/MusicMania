import * as React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';

// General purpose separator
const Separator = () => (
  <View style={CustomStyleSheet.separator} />
);

export default class PlayOptionsScreen extends Component {
  render(){
    return (
        <View style={CustomStyleSheet.container}>
        <Separator />
        <View style={CustomStyleSheet.containerRow}>
            <TouchableOpacity
            onPress={() => this.props.nav.navigate('Play')}
            style={CustomStyleSheet.button}>
            <Text style={CustomStyleSheet.buttonText}>FREE PLAY!</Text>
            </TouchableOpacity>
        </View>
        <Separator />
        <View style={CustomStyleSheet.containerRow}>
            <TouchableOpacity
            onPress={() => this.props.nav.navigate('Record Play')}
            style={CustomStyleSheet.button}>
            <Text style={CustomStyleSheet.buttonText}>RECORD</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
  } 
}
