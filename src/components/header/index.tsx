import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const Header_Max_Height = 200;
const Header_Min_Height = 50;

export default function Header({animHeaderValue}) {
  const width = useSharedValue(0);

  // const animateHeaderHeight = animHeaderValue.interpolate({
  //   inputRange: [0, Header_Max_Height - Header_Min_Height],
  //   outputRange: [Header_Max_Height, Header_Min_Height],
  //   extrapolate: 'clamp',
  // });

  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animHeaderValue,
      [0, 150],
      [1, 0],
    );
    return {opacity};
  }, [animHeaderValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: width.value,
    };
  });

  // const animateHeaderBackgroundColor = animHeaderValue.interpolate({
  //   inputRange: [0, Header_Max_Height - Header_Min_Height],
  //   outputRange: ['blue', 'red'],
  //   extrapolate: 'clamp',
  // });

  return (
    <Animated.View style={[styles.header]}>
      <Animated.Text style={[styles.title, animatedStyles]}>Add your info</Animated.Text>
      <Text style={styles.subtitle}>
        To complete your profile please fill in all necessary information
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  subtitle: {
    color: '#fff',
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
