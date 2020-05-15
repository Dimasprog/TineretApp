import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {border, fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import ModalButton from '../components/ModalButton';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function AppInfoModal({changeModalVisibility}) {
  const {modalContainer, modalTextContent} = styles;

  return (
    <View style={modalContainer}>
      <Text style={modalTextContent}>Inca nu lucreaza</Text>
      <ModalButton title={'OK'} onPress={() => changeModalVisibility(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: wp(60),
    padding: 10,
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
  },
  modalTextContent: {
    color: colors.main_font,
    fontFamily: Platform.OS === 'ios' ? null : fonts.cronus,
    textAlign: 'center',
    fontSize: hp(3),
  },
});

export default AppInfoModal;
