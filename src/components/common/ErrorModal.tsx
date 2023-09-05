import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

export const ErrorModal = ({error, visible, onClose}) => {
  return (
    // <Modal isOpen={visible} onClose={onClose} size={'lg'}>
    //   <Modal.Content p={5}>
    //     <Text pb={1} fontWeight={'600'} fontSize={'md'} color={'secondary.400'}>
    //       Error ⚠️
    //     </Text>
    //     <Text pb={3} fontWeight={'400'} fontSize={'sm'} numberOfLines={3}>
    //       {String(error)}
    //     </Text>
    //     <Button alignSelf={'flex-end'} onPress={onClose}>
    //       OK
    //     </Button>
    //   </Modal.Content>
    // </Modal>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{error}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
