import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import colors from '../Colors/colors';
import StartPageSubmitButton from './StartPageSubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/NoteProvider';
import NoteInputModel from './NoteInputModel';
const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};
const NoteDetail = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { setNotes } = useNotes();
  const [note, setNote] = useState(props.route.params.note);
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };
  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };
  const handleUpdate = async (
    event,
    organiserName,
    contact,
    email,
    address,
    time
  ) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.event = event;
        n.organiserName = organiserName;
        n.contact = contact;
        n.address = address;
        n.email = email;
        n.isUpdated = true;
        n.time = time;
        setNote(n);
      }
      return n;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);
  return (
    <View
      style={[
        { padding: 20, paddingTop: 100, backgroundColor: colors.PURPLE },
        StyleSheet.absoluteFillObject,
      ]}
    >
      <Text style={styles.time}>
        {note.isUpdated
          ? `Updated At ${formatDate(note.time)}`
          : `Created At ${formatDate(note.time)}`}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 23,
          color: colors.PRIMARY,
          marginBottom: 15,
        }}
      >
        EVENT:- {note.event}
      </Text>
      <Text style={{ fontWeight: '900', fontSize: 18, marginBottom: 15 }}>
        NAME: {note.organiserName}
      </Text>
      <Text style={{ fontWeight: '900', fontSize: 16, marginBottom: 15 }}>
        ADDRESS:- {note.address}
      </Text>
      <Text style={{ fontWeight: '700', fontSize: 14, marginBottom: 15 }}>
        CONTACT:-{note.contact}
      </Text>
      <Text style={{ fontWeight: '500', fontSize: 14, marginBottom: 15 }}>
        EMAIL:-{note.email}
      </Text>
      <View style={styles.btnContainer}>
        <StartPageSubmitButton
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <StartPageSubmitButton antIconName="edit" onPress={openEditModal} />
      </View>
      <NoteInputModel
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </View>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  container: {},
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});
