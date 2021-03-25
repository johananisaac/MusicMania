import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default class SettingsScreen extends Component {
  render(){
    return (
        <Theme.View style={CustomStyleSheet.styles.container}>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Settings Options')}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>Change Color</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Text Options')}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>Change Text</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
    </Theme.View>
    )
  } 
}
