import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default function App(props) {
  // icon sources
  // the unique icons to be used
  let cards = [
    {
      src: 'fontawesome',
      name: 'heart',
      color: 'red',
    },
    {
      src: 'entypo',
      name: 'feather',
      color: '#7d4b12',
    },
    {
      src: 'entypo',
      name: 'flashlight',
      color: '#f7911f',
    },
    {
      src: 'entypo',
      name: 'flower',
      color: '#37b24d',
    },
    {
      src: 'entypo',
      name: 'moon',
      color: '#ffd43b',
    },
    {
      src: 'entypo',
      name: 'youtube',
      color: '#FF0000',
    },
    {
      src: 'entypo',
      name: 'shop',
      color: '#5f5f5f',
    },
    {
      src: 'fontawesome',
      name: 'github',
      color: '#24292e',
    },
    {
      src: 'fontawesome',
      name: 'skype',
      color: '#1686D9',
    },
    {
      src: 'fontawesome',
      name: 'send',
      color: '#1c7cd6',
    },
    {
      src: 'ionicons',
      name: 'ios-magnet',
      color: '#d61c1c',
    },
    {
      src: 'ionicons',
      name: 'logo-facebook',
      color: '#3C5B9B',
    },
  ];

  // next: add code creating the clone and setting the cards in the state

  return (
    <View style={styles.card}>
      <TouchableHighlight
        onPress={props.clickCard}
        activeOpacity={0.75}
        underlayColor={'#f1f1f1'}>
        <CardSource name={icon_name} size={50} color={icon_color} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  score_container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
