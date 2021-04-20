import * as React from 'react';
import { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import { CustomStyleSheet } from '../styles';
import { TextInput } from 'react-native-gesture-handler';
import Theme, {createThemedComponent } from 'react-native-theming';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import SelectOption from './SelectOption';

const Button = createThemedComponent(TouchableOpacity);
const ThemeTextInput = createThemedComponent(TextInput);

// General purpose separator
const Separator = () => (
  <Theme.View style={CustomStyleSheet.styles.separator} />
);

export default class RecordingsScreen extends React.Component {

  constructor(props) {
    super(props)
    this.deleteRec = this.deleteRec.bind(this);
    this.deleteRecHandle = this.deleteRecHandle.bind(this);
    this.playRec = this.playRec.bind(this);
  }

  state = {
    recordings: {},
    recordingIDs: [],
    hasRecordings: false,
  }

  async componentDidMount(){
    let recMap = await AsyncStorage.getItem("recordingMap");
    let recIDs = await AsyncStorage.getItem("recordingIDs");
    if(recMap != null && recIDs != null){
      console.log("test");
      this.setState({
        hasRecordings: true,
        recordings: JSON.parse(recMap),
        recordingIDs: JSON.parse(recIDs)
      });
      console.log(this.state.recordings);
      console.log(this.state.recordingIDs);
    }
  }

  async playRec(filename){
    await AsyncStorage.setItem("recordingToAddToPlaylist", JSON.stringify(filename));
    this.props.nav.goBack();
  }

  async deleteRecHandle(filename){
    Alert.alert(
      "Delete Recording",
      "Are you sure you want to delete this recording?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.deleteRec(filename) }
      ]
    );
  }

  async deleteRec(filename){
      let recMap = await AsyncStorage.getItem("recordingMap");
      let recIDs = await AsyncStorage.getItem("recordingIDs");
      let recNames = await AsyncStorage.getItem("recordingNames");
      recMap = JSON.parse(recMap);
      recIDs = JSON.parse(recIDs);
      recNames = JSON.parse(recNames);
      recIDs.splice (recIDs.indexOf(filename), 1);
      let name = this.state.recordings[filename];
      recNames.splice(recNames.indexOf(name), 1);
      delete recMap[filename];
      console.log(recMap);
      console.log(recIDs);
      console.log(recNames);
      this.state.recordings = recMap;
      this.state.recordingIDs = recIDs;
      await AsyncStorage.setItem("recordingMap", JSON.stringify(recMap));
      await AsyncStorage.setItem("recordingIDs", JSON.stringify(recIDs));
      await AsyncStorage.setItem("recordingNames", JSON.stringify(recNames));
      this.forceUpdate();
  }

  render() {
    let message = (
      <Theme.Text style={CustomStyleSheet.styles.baseParagraph}>Record your own songs and view them here!</Theme.Text>
    );
    let recordings = this.state.recordingIDs.map((item, index) =>
      <SelectOption name={this.state.recordings[item]} key={index} onPress={() => {this.playRec(item)}} onLongPress={() => {this.deleteRecHandle(item)}}/>
    );
    return (
      <Theme.View style={CustomStyleSheet.styles.container}>
        {this.state.hasRecordings ? null : message}
        {recordings}
      </Theme.View>
    );
  }
  
}
