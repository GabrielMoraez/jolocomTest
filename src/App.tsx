import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import Input from './components/Input';
import LoadingCircle from './components/LoadingCircle';
import SubmitButton from './components/SubmitButton';

const MAX_HEIGHT = Dimensions.get('window').width;

export default function App() {
  // const lastName = useRef(null);
  // const phoneNumber = useRef(null);
  // const email = useRef(null);
  // const age = useRef(null); finish these later

  const [loading, setLoading] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  // inputs state

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  useEffect(() => {
    if (
      firstName.length &&
      lastName.length &&
      phoneNumber.length &&
      email.length &&
      age.length
    ) {
      setDisabledSubmit(false);
    }
  }, [firstName, lastName, phoneNumber, email, age]);

  const animatedTitleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(scrollY.value, [0, MAX_HEIGHT], [35, 20], {
      extrapolateRight: 'clamp',
    });
    const paddingTop = interpolate(scrollY.value, [0, MAX_HEIGHT], [100, 25], {
      extrapolateRight: 'clamp',
    });
    return {fontSize, paddingTop};
  }, [scrollY.value]);

  const animatedSubtitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, MAX_HEIGHT], [1, 0]);
    return {opacity};
  }, [scrollY.value]);

  const animatedWrapperStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, MAX_HEIGHT], [200, 75], {
      extrapolateRight: 'clamp',
    });
    return {height};
  }, [scrollY.value]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingCircle />
      ) : (
        <View>
          <Animated.View style={[styles.header, animatedWrapperStyle]}>
            <Animated.Text style={[styles.title, animatedTitleStyle]}>
              Add your info
            </Animated.Text>
            <Animated.Text style={[styles.subtitle, animatedSubtitleStyle]}>
              To complete your profile please fill in all necessary information
            </Animated.Text>
          </Animated.View>
          <Animated.ScrollView
            contentContainerStyle={styles.inputWrapper}
            scrollEventThrottle={16}
            onScroll={scrollHandler}>
            <Input
              placeholder="First Name"
              onChangeText={e => setFirstName(e)}
            />
            <Input placeholder="Last Name" onChangeText={e => setLastName(e)} />
            <Input
              placeholder="Phone Number"
              onChangeText={e => setPhoneNumber(e)}
              keyboardType="phone-pad"
            />
            <Input
              placeholder="Email"
              onChangeText={e => setEmail(e)}
              keyboardType="email-address"
            />
            <Input
              placeholder="Age"
              onChangeText={e => setAge(e)}
              keyboardType="numeric"
            />
            <SubmitButton
              disabled={disabledSubmit}
              onPress={() => setLoading(true)}
            />
          </Animated.ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: '#000',
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
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 35,
    height: 1500, // just for testing the header animation
  },
});
