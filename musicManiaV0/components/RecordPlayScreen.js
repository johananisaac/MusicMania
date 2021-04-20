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

export default class RecordPlayScreen extends React.Component {

  constructor(props) {
    super(props)
    this.playRec = this.playRec.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.deleteRec = this.deleteRec.bind(this);
    this.saveRec = this.saveRec.bind(this);
  }

  state = {
    showPlay: false,
    recording: null,
    name: ''
  }


  //const [recording, setRecording] = React.useState();
  //const [showPlay, setShowPlay] = React.useState();

  async startRecording() {
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
      this.setState({
        recording: recording
      });
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async stopRecording() {
    console.log('Stopping recording..');
    await this.state.recording.stopAndUnloadAsync();
    const uri = this.state.recording.getURI();
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
    let recCount = await AsyncStorage.getItem("numRecordings");
    if(recCount == null) {
      await AsyncStorage.setItem("numRecordings", "0");
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
    this.setState({
      showPlay: true,
      recording: undefined
    });
  }

  async playRec() {
    let filename = await AsyncStorage.getItem("numRecordings");
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

  async deleteRec() {
    let filename = await AsyncStorage.getItem("numRecordings");
    let doc_dir = await FileSystem.documentDirectory;
    await FileSystem.deleteAsync(doc_dir + filename + ".caf");
    this.setState({
      showPlay: false
    });
    let rec_loc = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    console.log(rec_loc);
  }

  async saveRec() {
    let numRecordings = await AsyncStorage.getItem("numRecordings");
    let recordingNames = await AsyncStorage.getItem("recordingNames");
    let recordingMap = await AsyncStorage.getItem("recordingMap");
    numRecordings = parseInt(numRecordings);
    if(this.state.name == ''){
      alert("Please name your recording!");
      return;
    } 
    else if(recordingNames == null) {
      recordingNames = [this.state.name]
      recordingMap = {};
      recordingMap[numRecordings] = this.state.name;
      await AsyncStorage.setItem("recordingNames", JSON.stringify(recordingNames));
      await AsyncStorage.setItem("recordingMap", JSON.stringify(recordingMap));
      numRecordings = numRecordings + 1;
      await AsyncStorage.setItem("numRecordings", JSON.stringify(numRecordings));
      this.props.nav.navigate('Play');
      return;
    }

    recordingNames = JSON.parse(recordingNames);
    recordingMap = JSON.parse(recordingMap);

    if(recordingNames.includes(this.state.name)){
      alert("There is already a recording of this name!");
      return;
    } else {    
      recordingNames.push(this.state.name);
      await AsyncStorage.setItem("recordingNames", JSON.stringify(recordingNames));      
      recordingMap[numRecordings] = this.state.name;
      await AsyncStorage.setItem("recordingMap", JSON.stringify(recordingMap));
      numRecordings = numRecordings + 1;
      await AsyncStorage.setItem("numRecordings", JSON.stringify(numRecordings));
    }
    this.props.nav.navigate('Play');
  }

  render() {
    let ShowRecord = (
      <Theme.View style={CustomStyleSheet.styles.container}>
        <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>
            {this.state.recording ? 'Stop Recording' : 'Start Recording' }
        </Theme.Text>
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
          <Button
            onPress={this.state.recording ? this.stopRecording : this.startRecording}
            style={CustomStyleSheet.styles.button}>
            <Theme.Text style={CustomStyleSheet.styles.buttonText}>Record your song!</Theme.Text>
          </Button>
        </Theme.View>
      </Theme.View>
    );
    let PlaySound = (
      <Theme.View style={CustomStyleSheet.styles.container}>
        <ThemeTextInput style={CustomStyleSheet.styles.paragraphInput}
          onChangeText={(text) => {
            this.setState({
              name: text
            })}} 
          placeholder="Name your song!"/>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
              onPress={this.playRec}
              style={CustomStyleSheet.styles.button}>
              <Theme.Text style={CustomStyleSheet.styles.buttonText}>Play</Theme.Text>
            </Button>
        </Theme.View>
        <Separator />
        <Theme.View style={CustomStyleSheet.styles.containerRow}>
            <Button
              onPress={() => {
                this.saveRec();
              }}
              style={CustomStyleSheet.styles.button}>
              <Theme.Text style={CustomStyleSheet.styles.buttonText}>Save</Theme.Text>
            </Button>
            <Button
              onPress={this.deleteRec}
              style={CustomStyleSheet.styles.button}>
              <Theme.Text style={CustomStyleSheet.styles.buttonText}>Delete</Theme.Text>
            </Button>
        </Theme.View>
      </Theme.View>
    );
    return (
      <Theme.View style={CustomStyleSheet.styles.container}>
      <Separator />
      <Theme.View style={CustomStyleSheet.styles.containerRowPlay}>
              <Button
              onPress={() => this.props.nav.navigate('Help Screen')}
              style={CustomStyleSheet.styles.helpButton}>
              <Theme.Text style={CustomStyleSheet.styles.helpButtonText}>HELP</Theme.Text>
              </Button>
        </Theme.View>
        { this.state.showPlay ? PlaySound : ShowRecord }
        <Separator />
      </Theme.View>
    );
  }
  
}
