import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SelectOption from './SelectOption';

export default function SelectScreenWrapper() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Tap the songs below to add them to the current playlist!
      </Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <SelectOption name='Saxophone' />
        <SelectOption name='Piano' />
        <SelectOption name='Sample Song' />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <SelectOption name='Saxophone' />
        <SelectOption name='Piano' />
        <SelectOption name='Sample Song' />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <SelectOption name='Saxophone' />
        <SelectOption name='Piano' />
        <SelectOption name='Sample Song' />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <SelectOption name='Saxophone' />
        <SelectOption name='Piano' />
        <SelectOption name='Sample Song' />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <SelectOption name='Saxophone' />
        <SelectOption name='Piano' />
        <SelectOption name='Sample Song' />
      </View>

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
    // margin: 24,
    // marginTop: 0,
    // fontSize: 14,
    // fontWeight: 'bold',
    // textAlign: 'center',
  },
});
