import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';

const Ring = ({delay}) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        2,
        false,
      ),
    );
  }, []);
  return <Animated.View style={[styles.ring, ringStyle]} />;
};

const ResultCircle = ({result}) => {
  const resultStyle = result ? styles.sucessCircle : styles.failCircule;
  const initial = useSharedValue(0);

  const circleStyle = useAnimatedStyle(() => {
    return {
      opacity: 0 + initial.value,
      transform: [
        {
          scale: interpolate(initial.value, [0, 1], [0, 2]),
        },
      ],
    };
  });
  useEffect(() => {
    initial.value = withDelay(
      8500,
      withTiming(1, {
        duration: 1000,
      }),
    );
  }, [initial]);
  return (
    <Animated.View style={[styles.resultCircle, circleStyle, resultStyle]}>
      <FontAwesomeIcon size={32} style={styles.resultIcon} icon={faCheck} />
    </Animated.View>
  );
};

export default function LoadingCircle() {
  return (
    <View style={styles.wrapper}>
      <Ring delay={0} />
      <Ring delay={1000} />
      <Ring delay={2000} />
      <Ring delay={3000} />
      <ResultCircle result={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    right: 'auto',
    marginTop: 150,
    zIndex: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  ring: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#561B2E',
    borderWidth: 10,
  },
  resultCircle: {
    display: 'flex',
    width: 80,
    height: 80,
    borderRadius: 40,
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sucessCircle: {
    backgroundColor: 'green',
  },
  failCircule: {
    backgroundColor: 'red',
  },
  resultIcon: {
    color: '#fff',
  },
});
