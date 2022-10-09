import * as React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default function Input({
  placeholder,
  keyboardType = 'default',
  onChangeText,
  //inputRef, remember to finish the "done" key feature
}) {
  const [borderColor, setBorderColor] = React.useState('#302E32');

  return (
    <TextInput
      // ref={inputRef}
      onChangeText={onChangeText}
      placeholderTextColor="#302E32"
      onBlur={() => setBorderColor('#302E32')}
      onFocus={() => setBorderColor('#383978')}
      {...{keyboardType, placeholder}}
      style={[styles.textInput, {borderColor: borderColor}]}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#1E1A20',
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
});
