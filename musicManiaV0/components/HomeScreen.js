import * as React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';

// General purpose separator
const Separator = () => (
  <View style={CustomStyleSheet.separator} />
);

export default class HomeScreen extends Component {
  render(){
    return (
        <View style={CustomStyleSheet.container}>
        <Separator />
        <View style={CustomStyleSheet.containerRow}>
            <TouchableOpacity
            onPress={() => this.props.nav.navigate('Play Options')}
            style={CustomStyleSheet.button}>
            <Text style={CustomStyleSheet.buttonText}>PLAY!</Text>
            </TouchableOpacity>
        </View>
        <Separator />
        <View style={CustomStyleSheet.containerRow}>
            <TouchableOpacity
            onPress={() => this.props.nav.navigate('Playlist Options')}
            style={CustomStyleSheet.button}>
            <Text style={CustomStyleSheet.buttonText}>SELECT!</Text>
            </TouchableOpacity>
        </View>
        <Separator />
    </View>
    )
  } 
}
