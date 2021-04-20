import * as React from 'react';
import { Component } from 'react';
import { Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { CustomStyleSheet } from '../styles';
import PlayButton from './PlayButton';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default class PlayScreen extends Component {
  render(){
    return (
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.View style={CustomStyleSheet.styles.containerRowPlay}>
        <Button
            onPress={() => {
              AsyncStorage.setItem("stopPlay", "True");
              this.props.nav.navigate('Home')
            }}
            style={CustomStyleSheet.styles.buttonShortPlay}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>Home!</Theme.Text>
        </Button>
        <Button
              onPress={() => this.props.nav.navigate('Help Screen')}
              style={CustomStyleSheet.styles.helpButtonPlay}>
              <Theme.Text style={CustomStyleSheet.styles.helpButtonText}>HELP</Theme.Text>
              </Button>
        </Theme.View>
        <PlayButton />
        <Separator />
      </Theme.View>
    )
  } 
}
