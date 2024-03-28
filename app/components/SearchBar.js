import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import colors from '../Colors/colors';
import { AntDesign } from '@expo/vector-icons';
const SearchBar = ({ value, onChangeText, onClear }) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="search event"
        style={styles.seacrhBar}
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={colors.PRIMARY}
          onPress={onClear}
          style={{ position: 'absolute', right: 10 }}
        />
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  seacrhBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    fontSize: 15,
    paddingLeft: 15,
    marginVertical: 20,
  },
});
