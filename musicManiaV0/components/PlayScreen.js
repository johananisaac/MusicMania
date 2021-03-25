import * as React from 'react';
import { Component } from 'react';
import { Text, TouchableOpacity} from 'react-native';
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
        <Button
            onPress={() => this.props.nav.navigate('Home')}
            style={CustomStyleSheet.styles.buttonShort}>
            <Theme.Text style={CustomStyleSheet.styles.shortButtonText}>Back to home!</Theme.Text>
        </Button>
        <PlayButton />
        <Separator />
      </Theme.View>
    )
  } 
}
