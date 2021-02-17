import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Local files
import PlayButton from './components/PlayButton';
import SelectScreenWrapper from './components/SelectScreenWrapper';

function PlayScreen({ navigation }) {
  return (

      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Play Screen</Text>
        <PlayButton />
        <Button
          title="Select Screen"
          onPress={() => navigation.navigate('Select')}
        />
      </View>
  );
}

function SelectScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Select Screen</Text>
      <SelectScreenWrapper></SelectScreenWrapper>
      <Button
        title="Play Screen"
        onPress={() => navigation.navigate('Play')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Play">
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
});
