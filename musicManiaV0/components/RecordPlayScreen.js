import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity, AsyncStorage} from 'react-native';
import { CustomStyleSheet } from '../styles';
import { TextInput } from 'react-native-gesture-handler';
import Theme, {createThemedComponent } from 'react-native-theming';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const Button = createThemedComponent(TouchableOpacity);
const ThemeTextInput = createThemedComponent(TextInput);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default function App() {

  const [recording, setRecording] = React.useState();
  const [showPlay, setShowPlay] = React.useState();
  const [recName, setRecName] = React.useState();

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
    let recCount = await AsyncStorage.getItem("Num_Recordings");
    if(recCount == null) {
      await AsyncStorage.setItem("Num_Recordings", "0");
      recCount = 0;
    }
    else {
      recCount = parseInt(recCount);
    }
    console.log(recCount);
    FileSystem.copyAsync(
    {
      from: uri,
      to: FileSystem.documentDirectory + String(recCount) + ".caf"
    });
    let rec_loc = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    console.log(rec_loc);
    setShowPlay(true);
  }

  async function playRec() {
    let filename = await AsyncStorage.getItem("Num_Recordings");
    let doc_dir = await FileSystem.documentDirectory;   
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: doc_dir + filename + ".caf"});
    let sound_status = await sound.getStatusAsync();
    if(sound_status.isLoaded){
      try {
       await sound.playAsync();
      }
      catch (error) {
      }
    }
  }

  async function deleteRec() {
    let filename = await AsyncStorage.getItem("Num_Recordings");
    let doc_dir = await FileSystem.documentDirectory;
    await FileSystem.deleteAsync(doc_dir + filename + ".caf");
    setShowPlay(false);
    let rec_loc = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    console.log(rec_loc);
  }

  const ShowRecord = () => (
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
    </Theme.View>
  )

  const PlaySound = () => (
    <Theme.View style={CustomStyleSheet.styles.container}>
      <ThemeTextInput style={CustomStyleSheet.styles.paragraphInput} 
        placeholder="Name your song!"/>
      <Separator />
      <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Button
            onPress={playRec}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>Play</Theme.Text>
          </Button>
      </Theme.View>
      <Separator />
      <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Button
            onPress={playRec}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>Save</Theme.Text>
          </Button>
          <Button
            onPress={deleteRec}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>Delete</Theme.Text>
          </Button>
      </Theme.View>
    </Theme.View>
  )

  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
      { showPlay ? <PlaySound /> : <ShowRecord /> }
    </Theme.View>
  );
}
