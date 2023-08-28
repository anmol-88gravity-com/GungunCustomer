import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {styles} from '../Mapscreen.styles';
import {AddressTypeButton} from './AddressTypeButton';
import {Colors} from '../../../../utils/Colors';

export const AddressModal = ({open, onClose, name}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <Text style={styles.exactAddress}>Enter the Exact Address</Text>
            <Pressable onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
          </View>
          <Text style={styles.saveAs}>Save as*</Text>
          <View style={styles.buttonRow}>
            <AddressTypeButton
              icon={<AntDesign name={'home'} size={18} color={'#808080'} />}
              title={'Home'}
            />
            <AddressTypeButton
              icon={
                <MaterialCommunityIcons
                  name="office-building-marker"
                  size={18}
                  color={'#808080'}
                />
              }
              title={'Work'}
            />
            <AddressTypeButton
              icon={
                <MaterialCommunityIcons
                  name="map-marker"
                  size={18}
                  color={'#808080'}
                />
              }
              title={'Other'}
            />
          </View>
          <TextInput
            label={'Flat / House No / Floor / Building*'}
            style={styles.flatStyles}
            mode={'outlined'}
            outlineStyle={styles.outlineStyles}
            inputStyle={styles.inputStyles}
            dense={true}
            placeholderTextColor={'#ccc'}
          />
          <TextInput
            label={'Area / Sector / Locality*'}
            outlineStyle={styles.outlineStyles}
            inputStyle={styles.inputStyles}
            style={styles.flatStyles}
            mode={'outlined'}
            dense={true}
            placeholderTextColor={'#ccc'}
          />
          <TextInput
            label={'Nearby landmark (optional)'}
            outlineStyle={styles.outlineStyles}
            inputStyle={styles.inputStyles}
            style={styles.flatStyles}
            mode={'outlined'}
            dense={true}
            placeholderTextColor={'#ccc'}
          />
          <Button
            buttonColor={Colors.primary}
            theme={{roundness: 0}}
            style={styles.modalButton}
            contentStyle={{height: 50}}
            labelStyle={styles.buttonLabelStyles}
            mode={'contained'}>
            {name === 'edit' ? 'Update' : 'Save'}
          </Button>
        </View>
      </View>
    </Modal>
  );
};
