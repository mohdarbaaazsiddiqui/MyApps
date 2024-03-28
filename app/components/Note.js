import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../Colors/colors';

const Note = ({ item, onPress }) => {
  const { event, organiserName, contact, email, address } = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text
          numberOfLines={1}
          style={{ fontWeight: 'bold', fontSize: 16, color: colors.PRIMARY }}
        >
          EVENT: {event}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontWeight: '700', fontSize: 14, color: colors.PRIMARY }}
        >
          ORG: {organiserName}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontWeight: '600', fontSize: 12, color: colors.PRIMARY }}
        >
          ADDRESS: {address}
        </Text>
        <Text numberOfLines={1}>CONTACT: {contact}</Text>
        <Text numberOfLines={1}>EMAIL: {email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Note;
const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PURPLE,
    width: width / 2 - 10,
    borderRadius: 10,
    padding: 8,
  },
});
