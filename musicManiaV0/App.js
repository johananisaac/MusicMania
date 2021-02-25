import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Local files
import PlayButton from './components/PlayButton';
import SelectScreenWrapper from './components/SelectScreenWrapper';

function TutorialScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.paragraph}>
          Interactive tutorial coming soon!
        </Text>
        <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.button}>
            <Text style={styles.buttonText}>Get Started!</Text>
        </TouchableOpacity>
      </View>
  );
}

function HomeScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Play')}
            style={styles.button}>
            <Text style={styles.buttonText}>PLAY!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Select')}
            style={styles.button}>
            <Text style={styles.buttonText}>SELECT!</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

function PlayScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PlayButton />
      </View>
  );
}

function SelectScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SelectScreenWrapper />
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
        <Stack.Screen name="Select" component={SelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 10,
    width: 100,
    height: 100,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
