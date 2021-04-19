// External Libraries
import React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import { useState, useCallback, useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from 'react-native-theming';
// Local files
import { CustomStyleSheet } from './styles'
import TutorialScreen from './components/TutorialScreen';
import TestScreen from './components/TestScreen';
import HomeScreen from './components/HomeScreen';
import PlayOptionsScreen from './components/PlayOptionsScreen';
import RecordPlayScreen from './components/RecordPlayScreen';
import PlayScreen from './components/PlayScreen';
import SelectPlaylistScreen from './components/SelectPlaylistScreen';
import SelectSongScreen from './components/SelectSongScreen';
import YoutubeScreen from './components/YoutubeScreen';
import HelpScreen from './components/HelpScreen';
import SettingsScreen from './components/SettingsScreen';
import SettingsOptionScreen from './components/SettingsOptionScreen';
import YoutubePlayScreen from './components/YoutubePlayScreen';

function TutorialNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
        <TutorialScreen nav={navigation}/>
    </Theme.View>
  );
}

function HomeNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
        <HomeScreen nav={navigation}/>
    </Theme.View>
  );
}

function PlayNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
        <PlayScreen nav={navigation}/>
    </Theme.View>
  );
}

function PlayOptionsNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
        <PlayOptionsScreen nav={navigation}/>
    </Theme.View>
  );
}

function RecordPlayNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
        <RecordPlayScreen nav={navigation}/>
    </Theme.View>
  );
}

function SelectPlaylistNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.containerRow}>
      <SelectPlaylistScreen nav={navigation}/>
    </Theme.View>
  );
}

function SelectSongNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
      <SelectSongScreen nav={navigation}/>
    </Theme.View>
  );
}

function YoutubeNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
      <YoutubeScreen nav={navigation}/>
    </Theme.View>
  );
}

function SettingsNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.containerRow}>
      <SettingsScreen nav={navigation}/>
    </Theme.View>
  );
}

function SettingsOptionNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
      <SettingsOptionScreen nav={navigation}/>
    </Theme.View>
  );
}

function HelpNavScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
      <HelpScreen nav={navigation}/>
    </Theme.View>
  );
}

function TestNavScreen({ navigation }) {
  return (
    <Theme.View>
    <View style={CustomStyleSheet.styles.container}>
      <TestScreen nav={navigation}/>
    </View>
    </Theme.View>
  );
}
function YoutubeNavPlayScreen({ navigation }) {
  return (
    <Theme.View style={CustomStyleSheet.styles.container}>
      <YoutubePlayScreen nav={navigation}/>
    </Theme.View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tutorial"> 
        <Stack.Screen name="Tutorial" component={TutorialNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Home" component={HomeNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Settings" component={SettingsNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Settings Options" component={SettingsOptionNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Play Options" component={PlayOptionsNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Record Play" component={RecordPlayNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Play" component={PlayNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Playlist Options" component={SelectPlaylistNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Playlist" component={SelectSongNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Help Screen" component={HelpNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="Youtube" component={YoutubeNavScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
        <Stack.Screen name="YoutubePlay" component={YoutubeNavPlayScreen} options={{
          headerStyle: {
            backgroundColor: '#808080',
          },
          headerTintColor: '#fff',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//screenOptions={}