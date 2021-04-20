import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';

const Button = createThemedComponent(TouchableOpacity);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default class TutorialScreen extends Component {
  constructor(props){
    super(props)
  }

  state = {
    showScreen1: true,
    showScreen2: false,
    showScreen3: false,
    showScreen4: false,
    showScreen5: false,
    showScreen6: false,
    showScreen7: false,
    showScreen8: false
  }

  render(){
    let Screen1 = (
      <Button
        onPress={() => {
          this.setState({
            showScreen1: false,
            showScreen2: true
          })
        }}
        style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.shortButtonText}>On the home screen you can start playing, select a playlist, or change the settings</Theme.Text>
          <Image source={require('../assets/images/home.jpg')}
            style={CustomStyleSheet.styles.buttonImage} />
      </Button>
    )
    let Screen2 = (
      <Button
        onPress={() => {
          this.setState({
            showScreen2: false,
            showScreen3: true
          })
        }}
        style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.shortButtonText}>Free Play! Tap to play, and hold to pause</Theme.Text>
          <Image source={require('../assets/images/freeplay.jpg')}
            style={CustomStyleSheet.styles.buttonImage} />
      </Button>
    )
    let Screen3 = (
      <Button
        onPress={() => {
          this.setState({
            showScreen3: false,
            showScreen4: true
          })
        }}
        style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.shortButtonText}>Make playlists by choosing from the sounds below!</Theme.Text>
          <Image source={require('../assets/images/playlist.jpg')}
            style={CustomStyleSheet.styles.buttonImage} />
      </Button>
    )
    let Screen4 = (
      <Button
        onPress={() => {
          this.setState({
            showScreen4: false,
            showScreen5: true
          })
        }}
        style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.shortButtonText}>Record your own songs from your microphone!</Theme.Text>
          <Image source={require('../assets/images/record.jpg')}
            style={CustomStyleSheet.styles.buttonImage} />
      </Button>
    )
    let Screen5 = (
      <Button
        onPress={() => {
          this.setState({
            showScreen5: false,
            showScreen6: true
          })
        }}
        style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>Change settings like the color scheme or add more players! Tap additional player names to remove them.</Theme.Text>
          <Image source={require('../assets/images/settings.jpg')}
            style={CustomStyleSheet.styles.buttonImage} />
      </Button>
    )
    let Screen6 = (
      <Button
        onPress={() => {
          this.setState({
            showScreen6: false,
            showScreen7: true
          })
        }}
        style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>Each player has their own area to play!</Theme.Text>
          <Image source={require('../assets/images/twoplay.jpg')}
            style={CustomStyleSheet.styles.buttonImage} />
      </Button>
    )
    let Screen7 = (
      <Button
        onPress={() => {
          this.setState({
            showScreen7: false,
            showScreen8: true
          })
        }}
        style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.buttonTextMedium}>Tap the bright red help button on each screen, and a sound will play to alert others nearby!</Theme.Text>
          <Image source={require('../assets/images/help.jpg')}
            style={CustomStyleSheet.styles.buttonImage} />
      </Button>
    )
    let Screen8 = (
      <Button
        onPress={() => this.props.nav.navigate('Home')}
        style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.buttonText}>Get Started!</Theme.Text>
      </Button>
    )
    return (
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
          Tutorial
        </Theme.Text>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          {this.state.showScreen1 ? Screen1 : null}
          {this.state.showScreen2 ? Screen2 : null}
          {this.state.showScreen3 ? Screen3 : null}
          {this.state.showScreen4 ? Screen4 : null}
          {this.state.showScreen5 ? Screen5 : null}
          {this.state.showScreen6 ? Screen6 : null}
          {this.state.showScreen7 ? Screen7 : null}
          {this.state.showScreen8 ? Screen8 : null}
        </Theme.View>
        <Separator />
      </Theme.View>
    )
  } 
}
