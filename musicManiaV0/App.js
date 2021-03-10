import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Local files
import PlayButton from './components/PlayButton';
import SelectScreenWrapper from './components/SelectScreenWrapper';
import PlaylistEditorScreenWrapper from './components/PlaylistEditorScreenWrapper';

const Separator = () => (
  <View style={styles.separator} />
);

function TutorialScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Interactive tutorial coming soon!
        </Text>
        <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.button}>
            <Text style={styles.buttonText}>Get Started!</Text>
        </TouchableOpacity>
        <Separator />
      </View>
  );
}

function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
          <Separator />
          <TouchableOpacity
            onPress={() => navigation.navigate('Play')}
            style={styles.button}>
            <Text style={styles.buttonText}>PLAY!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Playlist Options')}
            style={styles.button}>
            <Text style={styles.buttonText}>SELECT!</Text>
          </TouchableOpacity>
          <Separator />
      </View>
  );
}

function PlayScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.buttonShort}>
            <Text style={styles.shortButtonText}>Back to home!</Text>
        </TouchableOpacity>
        <PlayButton />
        <Separator />
      </View>
  );
}

function PlaylistSelectScreen({ navigation }) {
  return (
    <View style={styles.containerRow}>
      <PlaylistEditorScreenWrapper nav={navigation}/>
    </View>
  );
}

function PlaylistEditorScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SelectScreenWrapper nav={navigation}/>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tutorial">
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Play" component={PlayScreen} />
        <Stack.Screen name="Playlist Options" component={PlaylistSelectScreen} />
        <Stack.Screen name="Playlist" component={PlaylistEditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    margin: 10,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',

    borderRadius: 5,
    backgroundColor: 'white',
    
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonShort: {
    width: '100%',
    height: '5%',
    justifyContent: 'center',
    textAlign: 'center',

    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonText: {
    // fontSize: 30, // Phone
    fontSize: 70, // iPad
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  shortButtonText: {
    // fontSize: 30, // Phone
    fontSize: 50, // iPad
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  separator: {
    width: '100%',
    height: '3%',
    backgroundColor: 'black'
  },
});
