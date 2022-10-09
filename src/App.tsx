import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

// You can import from local files
import Header from './components/header';
import {DATA} from './data';

const MAX_HEIGHT = Dimensions.get('window').width;

export default function App() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(scrollY.value, [0, MAX_HEIGHT], [35, 20], {
      extrapolateRight: 'clamp',
    });
    const paddingTop = interpolate(scrollY.value, [0, MAX_HEIGHT], [100, 10], {
      extrapolateRight: 'clamp',
    });
    return {fontSize, paddingTop};
  }, [scrollY.value]);

  const animatedSubtitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, MAX_HEIGHT], [1, 0]);
    return {opacity};
  }, [scrollY.value]);

  const animatedWrapperStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, MAX_HEIGHT], [200, 50], {
      extrapolateRight: 'clamp',
    });
    return {height};
  }, [scrollY.value]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, animatedWrapperStyle]}>
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          Add your info
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, animatedSubtitleStyle]}>
          To complete your profile please fill in all necessary information
        </Animated.Text>
      </Animated.View>
      <Animated.ScrollView scrollEventThrottle={16} onScroll={scrollHandler}>
        {DATA.map((book, index) => {
          return (
            <Text style={styles.scrollText} key={book.id}>
              {book.title}
            </Text>
          );
        })}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  scrollText: {
    fontSize: 19,
    textAlign: 'center',
    padding: 20,
    color: '#000',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
