import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function PlayButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.button}>
      <Text style={styles.paragraph}>
        Touch anywhere on the screen to play music!
      </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'powderblue',
  },
});
