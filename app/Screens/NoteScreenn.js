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
import SearchBar from '../components/SearchBar';
import StartPageSubmitButton from '../components/StartPageSubmitButton';
import NoteInputModel from '../components/NoteInputModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../context/NoteProvider';
import NotFound from '../components/NotFound';

const reverseDataOfNotes = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const NoteScreenn = ({ user, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { notes, setNotes, findNotes } = useNotes();
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const handleOnSearchInput = async (text) => {
    if (!text.trim()) {
      setSearchNotFound(false);
      setSearchQuery('');
      return await findNotes();
    }
    setSearchQuery(text);
    const filteredNotes = notes.filter((note) => {
      if (
        note.event.toLowerCase().includes(text.toLowerCase()) ||
        note.organiserName.toLowerCase().includes(text.toLowerCase())
      ) {
        return note;
      }
    });
    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setSearchNotFound(true);
    }
  };
  const findTimeToGreet = () => {
    const hrs = new Date().getHours();
    0;
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 1 || hrs < 17) return setGreet('AfterNoon');
    setGreet('Evening');
  };
  useEffect(() => {
    findTimeToGreet();
    // AsyncStorage.clear();
  }, []);
  const reversedNotes = reverseDataOfNotes(notes);

  const handleOnSubmit = async (
    event,
    organiserName,
    contact,
    email,
    address
  ) => {
    const time = Date.now();
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
  const handleOnClear = async () => {
    setSearchQuery('');
    setSearchNotFound(false);
    await findNotes();
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text
            style={styles.greetUserText}
          >{`Good ${greet} ${user.name} 🥳`}</Text>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              onClear={handleOnClear}
            />
          ) : null}
          {searchNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
              numColumns={2}
              data={reversedNotes}
              renderItem={({ item }) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
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
