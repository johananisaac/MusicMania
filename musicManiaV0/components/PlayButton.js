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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  paragraph: {
    marginTop: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 20,
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
