import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default class PlayOptionsScreen extends Component {
  render(){
    return (
        <Theme.View style={CustomStyleSheet.styles.container}>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => {
                //AsyncStorage.setItem("stopPlay", "False");
                this.props.nav.navigate('Play')
            }}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>FREE PLAY!</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Record Play')}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>RECORD</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.helpContainerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Help Screen')}
            style={CustomStyleSheet.styles.helpButton}>
            <Theme.Text style={CustomStyleSheet.styles.helpButtonText}>HELP</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        </Theme.View>
    )
  } 
}
