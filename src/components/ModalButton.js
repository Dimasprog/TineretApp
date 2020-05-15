import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {border, fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

function ModalButton(props) {
  return (
    <TouchableOpacity
      style={styles.modalButton}
      activeOpacity={0.4}
      onPress={props.onPress}>
      <Text style={styles.modalButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalButton: {
    backgroundColor: colors.background,
    borderRadius: border.radius,
    alignSelf: 'flex-end',
    marginTop: border.lateral_span / 2,
    padding: border.lateral_span,
    paddingVertical: 3,
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
  },
  modalButtonText: {
    color: colors.second_font,
    fontFamily: Platform.OS === 'ios' ? null : fonts.xthin,
    textAlign: 'center',
    fontSize: hp(2.5),
  },
});

export default ModalButton;
