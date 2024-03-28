import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors/colors';
const StartPageSubmitButton = ({
  antIconName,
  size,
  color,
  style,
  onPress,
}) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color || colors.LIGHT}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

export default StartPageSubmitButton;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PRIMARY,
    // borderRadius: 50,
    padding: 15,
  },
});
