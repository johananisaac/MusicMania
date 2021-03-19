// External Libraries
import React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Local files
import { CustomStyleSheet } from './styles'
import TutorialScreen from './components/TutorialScreen';
import HomeScreen from './components/HomeScreen';
import PlayOptionsScreen from './components/PlayOptionsScreen';
import RecordPlayScreen from './components/RecordPlayScreen';
import PlayScreen from './components/PlayScreen';
import SelectPlaylistScreen from './components/SelectPlaylistScreen';
import SelectSongScreen from './components/SelectSongScreen';
import RecordOwnAudioScreen from './components/RecordOwnAudioScreen';

function TutorialNavScreen({ navigation }) {
  return (
      <View style={CustomStyleSheet.container}>
        <TutorialScreen nav={navigation}/>
      </View>
  );
}

function HomeNavScreen({ navigation }) {
  return (
      <View style={CustomStyleSheet.container}>
        <HomeScreen nav={navigation}/>
      </View>
  );
}

function PlayNavScreen({ navigation }) {
  return (
      <View style={CustomStyleSheet.container}>
        <PlayScreen nav={navigation}/>
      </View>
  );
}

function PlayOptionsNavScreen({ navigation }) {
  return (
      <View style={CustomStyleSheet.container}>
        <PlayOptionsScreen nav={navigation}/>
      </View>
  );
}

function RecordPlayNavScreen({ navigation }) {
  return (
      <View style={CustomStyleSheet.container}>
        <RecordPlayScreen nav={navigation}/>
      </View>
  );
}

function SelectPlaylistNavScreen({ navigation }) {
  return (
    <View style={CustomStyleSheet.containerRow}>
      <SelectPlaylistScreen nav={navigation}/>
    </View>
  );
}

function SelectSongNavScreen({ navigation }) {
  return (
    <View style={CustomStyleSheet.container}>
      <SelectSongScreen nav={navigation}/>
    </View>
  );
}

function RecordOwnAudioNavScreen({ navigation }) {
  return (
    <View style={CustomStyleSheet.container}>
      <RecordOwnAudioScreen nav={navigation}/>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tutorial">
        <Stack.Screen name="Tutorial" component={TutorialNavScreen} />
        <Stack.Screen name="Home" component={HomeNavScreen} />
        <Stack.Screen name="Play Options" component={PlayOptionsNavScreen} />
        <Stack.Screen name="Record Play" component={RecordPlayNavScreen} />
        <Stack.Screen name="Play" component={PlayNavScreen} />
        <Stack.Screen name="Playlist Options" component={SelectPlaylistNavScreen} />
        <Stack.Screen name="Playlist" component={SelectSongNavScreen} />
        <Stack.Screen name="Record Own Song" component={RecordOwnAudioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
