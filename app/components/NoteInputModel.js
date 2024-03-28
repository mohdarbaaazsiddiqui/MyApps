import {
  Keyboard,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../Colors/colors';
import StartPageSubmitButton from './StartPageSubmitButton';

const NoteInputModel = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [event, setEvent] = useState('');
  const [organiserName, setOrganiserName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handlePress = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setEvent(note.event);
      setOrganiserName(note.organiserName);
      setAddress(note.address);
      setContact(note.contact);
      setEmail(note.email);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'Event') setEvent(text);
    if (valueFor === 'OrganiserName') setOrganiserName(text);
    if (valueFor === 'ContactNumber') setContact(text);
    if (valueFor === 'Email') setEmail(text);
    if (valueFor === 'Address') setAddress(text);
  };
  //   console.log(event);

  const handlSubmitInput = () => {
    if (
      !event.trim() &&
      !organiserName.trim() &&
      !contact.trim() &&
      !email.trim() &&
      !address.trim()
    )
      return onClose();
    if (isEdit) {
      onSubmit(event, organiserName, contact, email, address, Date.now());
    } else {
      onSubmit(event, organiserName, contact, email, address);
      setEvent(''),
        setOrganiserName(''),
        setContact(''),
        setEmail(''),
        setAddress('');
    }
    onClose();
  };
  const closeModal = () => {
    if (!isEdit) {
      setEvent(''),
        setOrganiserName(''),
        setContact(''),
        setEmail(''),
        setAddress('');
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />

      <Modal visible={visible} animationType="fade">
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 50,
              marginHorizontal: 10,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            ADD EVENT DETAILS
          </Text>

          <Text style={{ fontSize: 16, paddingLeft: 15, marginTop: 10 }}>
            Event
          </Text>
          <TextInput
            value={event}
            onChangeText={(text) => handleOnChangeText(text, 'Event')}
            placeholder="Event"
            style={{
              borderWidth: 0.5,
              borderColor: colors.PRIMARY,
              marginHorizontal: 10,
              marginVertical: 5,
              // marginTop: 100,
              paddingLeft: 15,
              height: 40,
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 16, paddingLeft: 15, marginTop: 10 }}>
            Organiser Name
          </Text>
          <TextInput
            value={organiserName}
            onChangeText={(text) => handleOnChangeText(text, 'OrganiserName')}
            placeholder="Organiser Name"
            style={{
              borderWidth: 0.5,
              borderColor: colors.PRIMARY,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingLeft: 15,
              height: 40,
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 16, paddingLeft: 15, marginTop: 10 }}>
            Contact Number
          </Text>
          <TextInput
            value={contact}
            onChangeText={(text) => handleOnChangeText(text, 'ContactNumber')}
            placeholder="Contact Number"
            keyboardType="number-pad"
            style={{
              borderWidth: 0.5,
              borderColor: colors.PRIMARY,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingLeft: 15,
              height: 40,
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 16, paddingLeft: 15, marginTop: 10 }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={(text) => handleOnChangeText(text, 'Email')}
            placeholder="Email"
            keyboardType="email-address"
            style={{
              borderWidth: 0.5,
              borderColor: colors.PRIMARY,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingLeft: 15,
              height: 40,
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 16, paddingLeft: 15, marginTop: 10 }}>
            Address
          </Text>
          <TextInput
            value={address}
            onChangeText={(text) => handleOnChangeText(text, 'Address')}
            placeholder="Address"
            style={{
              borderWidth: 0.5,
              borderColor: colors.PRIMARY,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingLeft: 15,
              height: 40,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 15,
              gap: 10,
            }}
          >
            <StartPageSubmitButton
              size={15}
              antIconName="check"
              onPress={handlSubmitInput}
            />
            {event.trim() ||
            organiserName.trim() ||
            contact.trim() ||
            email.trim() ||
            address.trim() ? (
              <StartPageSubmitButton
                size={15}
                antIconName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModel;

const styles = StyleSheet.create({
  modalBG: {
    flex: 1,
    zIndex: -1,
    backgroundColor: colors.PURPLE,
  },
});
