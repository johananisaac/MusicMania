import * as React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { CustomStyleSheet } from '../styles'
// Use Animated library for ripples in the future
import Ripple from 'react-native-material-ripple';

export default class PlayButton extends Component {
  constructor(props){
    super(props)
  }

  async componentDidMount() {
    this.music = new Audio.Sound();
    
    try {
      await this.music.loadAsync(
        require("../assets/music/Eine_Kleine_Nachtmusik_by_Mozart_Copyright_Free_Music.mp3")
      );
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
      print("Error");
    }
  }

  onPlayIn = () => {
    this.music.playAsync();
  }

  onPlayOut = () => {
    this.music.pauseAsync();
  }

  render(){
    return (
      <View style={CustomStyleSheet.container}>
        <Ripple style={CustomStyleSheet.playButton}
          onPressIn={this.onPlayIn}
          onPressOut={this.onPlayOut}
          rippleSize={150}>
          <Text style={CustomStyleSheet.playButtonText}>
            Touch anywhere on the screen to play music!
          </Text>
        </Ripple>
      </View>
    );
  }
}
