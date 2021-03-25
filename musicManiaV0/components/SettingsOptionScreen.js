import * as React from 'react';
import { Component } from 'react';
import { ScrollView } from 'react-native';
import SelectOption from './SelectOption';
import { CustomStyleSheet } from '../styles';
import Theme from 'react-native-theming';

export default class SettingsOptionScreen extends Component {
  updateTheme(theme) {
    CustomStyleSheet.styles.changeTheme(theme);
    this.forceUpdate();
  }
  render(){
    return (
      <ScrollView>
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
            Select your color scheme!
          </Theme.Text>
        </Theme.View>
        <Theme.View style={CustomStyleSheet.styles.row}>
            { CustomStyleSheet.themes.map(theme => (
            <SelectOption name={theme.name} key={theme.name} onPress={() => theme.apply()} />
            ))
          }
        </Theme.View>
      </Theme.View>
      </ScrollView>
    )
  }
  
}
