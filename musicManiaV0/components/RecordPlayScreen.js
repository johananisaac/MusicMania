import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { CustomStyleSheet } from '../styles';
import Theme, {createThemedComponent } from 'react-native-theming';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const Button = createThemedComponent(TouchableOpacity);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default function App() {
  const [recording, setRecording] = React.useState();
  const [sound, setSound] = React.useState();
  const [showPlay, setShowPlay] = React.useState();

  var new_uri = '';

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    setSound(sound);
    setShowPlay(true);
  }

  async function playSound() {
    if(sound != null) {
      sound.playAsync();
      setShowPlay(false);
    }
    else {
      console.log("playSound error");
    }
  }

  const PlaySound = () => (
    <Theme.View style={CustomStyleSheet.styles.containerRow}>
        <Button
          onPress={playSound}
          style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.buttonText}>Play</Theme.Text>
        </Button>
    </Theme.View>
  )

  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
      <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
        {recording ? 'Stop Recording' : 'Start Recording' }
      </Theme.Text>
      <Theme.View style={CustomStyleSheet.styles.containerRow}>
        <Button
          onPress={recording ? stopRecording : startRecording}
          style={CustomStyleSheet.styles.button}>
          <Theme.Text style={CustomStyleSheet.styles.buttonText}>Record your song!</Theme.Text>
        </Button>
      </Theme.View>
      { showPlay ? <PlaySound /> : null }
    </Theme.View>
  );
}
