import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import StartPageSubmitButton from '../components/StartPageSubmitButton';
import colors from '../Colors/colors';

const StartPage = ({ onFinish }) => {
  const [name, setName] = useState('');
  const handleOnChangeText = (text) => setName(text);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Wecome Onboard🚀</Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="please enter your name"
          style={styles.textInput}
        />
        {name.trim().length > 0 ? (
          <StartPageSubmitButton
            antIconName="arrowright"
            onPress={handleSubmit}
          />
        ) : null}
      </View>
    </>
  );
};

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.DARK,
    color: colors.DARK,
    width: '80%',
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  inputTitle: {
    fontSize: 26,
    marginBottom: 15,
  },
});

export default StartPage;
