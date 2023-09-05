import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {FONT_SIZES} from '../../utils/FontSize';
import {Colors} from '../../utils/Colors';
import {Font_Family} from '../../utils/Fontfamily';

export const MessageModal = ({msg, visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{msg}</Text>
          <Button
            onPress={onClose}
            buttonColor={Colors.primary}
            theme={{roundness: 0}}
            style={styles.buttonStyles}
            labelStyle={styles.buttonLabel}
            mode={'contained'}>
            OK
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: FONT_SIZES.fifteen,
    color: Colors.black,
    fontFamily: Font_Family.regular,
  },
  buttonStyles: {
    borderRadius: 5,
  },
  buttonLabel: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
  },
});
