import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';
import { Audio, AVPlaybackStatus } from 'expo-av';

const Button = createThemedComponent(TouchableOpacity);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default class RecordOwnAudioScreen extends Component {
  constructor(props){
    super(props);
    this.stopSiren = this.stopSiren.bind(this)
  }
  state = {
    sound: null,
    siren: true
  }

  async componentDidMount(){
    this.state.sound = new Audio.Sound();
    await this.state.sound.loadAsync(require('../assets/music/Help.mp3'));
    await this.state.sound.playAsync();
    await this.state.sound.setStatusAsync({ isLooping: true });
  }

  async stopSiren(){
    await this.state.sound.unloadAsync();
  }

  render(){
    return (
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
            onPress={() => {
                this.stopSiren();
                this.props.nav.navigate('Home');
            }}
            style={CustomStyleSheet.styles.helpButton}>
            <Theme.Text style={CustomStyleSheet.styles.helpButtonText}>HELP</Theme.Text>
            </Button>
        </Theme.View>
        </Theme.View>
    )
  } 
}
