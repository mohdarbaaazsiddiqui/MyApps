import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../Colors/colors';
import SearchBar from '../components/SearchBar';
import StartPageSubmitButton from '../components/StartPageSubmitButton';
import NoteInputModel from '../components/NoteInputModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';

const NoteScreenn = ({ user, navigation }) => {
  const [notes, setNotes] = useState([]);
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const findTimeToGreet = () => {
    const hrs = new Date().getHours();
    0;
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 1 || hrs < 17) return setGreet('AfterNoon');
    setGreet('Evening');
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) setNotes(JSON.parse(result));
    console.log(result);
  };

  useEffect(() => {
    findNotes();
    findTimeToGreet();
    // AsyncStorage.clear();
  }, []);
  const handleOnSubmit = async (
    event,
    organiserName,
    contact,
    email,
    address
  ) => {
    const time = new Date().getTime();
    const Note = {
      id: Date.now(),
      event,
      organiserName,
      contact,
      email,
      address,
      time,
    };
    const updatedNotes = [...notes, Note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  // console.log();
  if (modalVisible === true) console.log('pressed');
  else console.log('not');

  const openNote = (note) => {
    navigation.navigate('NoteDetail', { note });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text
            style={styles.greetUserText}
          >{`Good ${greet} ${user.name} 🥳`}</Text>
          {notes.length ? <SearchBar /> : null}

          <View>
            <FlatList
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
              numColumns={2}
              data={notes}
              renderItem={({ item }) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
              // keyExtractor={(item) => item.id.toString()}
            />
          </View>
          {!notes.length ? (
            <View style={[styles.subContainer, StyleSheet.absoluteFillObject]}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 25,
                  opacity: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                ADD EVENTS 🖊️
              </Text>
            </View>
          ) : null}

          <StartPageSubmitButton
            onPress={() => setModalVisible(true)}
            antIconName="plus"
            style={styles.icon}
          />
        </View>
      </TouchableWithoutFeedback>
      <NoteInputModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default NoteScreenn;

const styles = StyleSheet.create({
  greetUserText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 60,
    flex: 1,
    zIndex: 1,
    // backgroundColor:'red'
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    // backgroundColor: 'red',
  },
  icon: {
    borderRadius: 20,
    shadowColor: 'gray',
    right: 15,
    bottom: 45,
    position: 'absolute',
  },
});
