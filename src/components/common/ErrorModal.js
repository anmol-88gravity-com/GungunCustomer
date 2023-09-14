import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {FONT_SIZES} from '../../utils/FontSize';
import {Colors} from '../../utils/Colors';
import {Font_Family} from '../../utils/Fontfamily';

export const ErrorModal = ({visible, onClose, error}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeadingText}>Error ⚠️</Text>
          <Text style={styles.modalText}>{error}</Text>
          <Button
            onPress={onClose}
            buttonColor={Colors.primary}
            theme={{roundness: 0}}
            style={styles.buttonStyles}
            contentStyle={{height: 40}}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
   

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 60,
    paddingVertical:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeadingText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: FONT_SIZES.fifteen,
    color: Colors.black,
    fontFamily: Font_Family.semiBold,
  },
  modalText: {
    marginBottom: 15,
    fontSize: FONT_SIZES.fifteen,
    color: Colors.black,
    fontFamily: Font_Family.regular,
  },
  buttonStyles: {
    width: '100%',
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  buttonLabel: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
  },
});
