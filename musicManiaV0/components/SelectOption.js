import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function SelectOption(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.container}>{props.name}</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 10,
    width: 100,
    height: 100,
    backgroundColor: 'powderblue',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
