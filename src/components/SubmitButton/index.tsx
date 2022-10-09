import * as React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

export default function SubmitButton() {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>Submit</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 45,
    backgroundColor: '#561B2E',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 35,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 17,
  },
});
