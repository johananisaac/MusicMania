import * as React from 'react';
import { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Text, TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default class HomeScreen extends Component {
  async componentDidMount() {
    let tutorial = await AsyncStorage.getItem("firstAppUse");
    if(tutorial == null){
        //await AsyncStorage.setItem("firstAppUse", "false");
        this.props.nav.navigate('Tutorial');
    }
  }
  render(){
    return (
        <Theme.View style={CustomStyleSheet.styles.container}>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.helpContainerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Help Screen')}
            style={CustomStyleSheet.styles.helpButton}>
            <Theme.Text style={CustomStyleSheet.styles.helpButtonText}>HELP</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Play Options')}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>PLAY!</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Playlist Options')}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>SELECT!</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => this.props.nav.navigate('Settings Options')}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>SETTINGS!</Theme.Text>
            </Button>
        </Theme.View>
    </Theme.View>
    )
  } 
}
