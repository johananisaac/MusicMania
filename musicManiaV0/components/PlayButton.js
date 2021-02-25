import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import{Audio} from 'expo-av';

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
    this.music.replayAsync();
  }

  onPlayOut = () => {
    this.music.stopAsync();
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPressIn={this.onPlayIn}
        onPressOut={this.onPlayOut}>
        <Text style={styles.paragraph}>
          Touch anywhere on the screen to play music!
        </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'powderblue',
    borderRadius: 5,
  },
});
