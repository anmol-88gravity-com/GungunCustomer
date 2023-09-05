import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
export const MessageModal = ({msg, visible, onClose}) => {
  return (
    // <Modal isOpen={visible} onClose={onClose} size={'lg'}>
    //   <Modal.Content px={5} py={2} mb={5} mt={'auto'} w={'90%'}>
    //     <HStack alignItems={'center'} justifyContent={'space-between'}>
    //       <Text fontWeight={'400'} fontSize={'sm'}>
    //         {String(msg)}
    //       </Text>
    //       <Button variant={'ghost'} alignSelf={'flex-end'} onPress={onClose}>
    //         OK
    //       </Button>
    //     </HStack>
    //   </Modal.Content>
    // </Modal>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{msg}</Text>
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
