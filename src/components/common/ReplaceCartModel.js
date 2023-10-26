import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {FONT_SIZES} from '../../utils/FontSize';
import {Colors} from '../../utils/Colors';
import {Font_Family} from '../../utils/Fontfamily';

export const ReplaceCartModel = ({
  visible,
  onClose,
  updateCart,
  cartLoading,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeadingText}>Update Cart</Text>
          <Text style={styles.modalText}>
            Your cart contains dishes from other restaurant. Do you want to
            discard the selection and add dishes from this restaurant?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button
              onPress={onClose}
              theme={{roundness: 0, colors: {outline: Colors.primary}}}
              style={styles.buttonStyles}
              contentStyle={{height: 40}}
              labelStyle={styles.buttonLabel}
              mode={'outlined'}>
              No
            </Button>
            <Button
              onPress={updateCart}
              disabled={cartLoading}
              loading={cartLoading}
              buttonColor={Colors.primary}
              theme={{roundness: 0}}
              style={styles.buttonStyles}
              contentStyle={{height: 40}}
              labelStyle={styles.buttonLabel}
              mode={'contained'}>
              Update
            </Button>
          </View>
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
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
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
    fontSize: FONT_SIZES.eighteen,
    color: Colors.black,
    fontFamily: Font_Family.bold,
  },
  modalText: {
    marginBottom: 15,
    fontSize: FONT_SIZES.fifteen,
    color: Colors.black,
    fontFamily: Font_Family.regular,
  },
  buttonStyles: {
    borderRadius: 5,
    width: '45%',
  },
  buttonLabel: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
  },
});
