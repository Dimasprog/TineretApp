import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {border, fonts, shadow} from '../../constants';
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
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  modalButtonText: {
    color: colors.second_font,
    fontFamily: fonts.xthin,
    textAlign: 'center',
    fontSize: hp(2.5),
  },
});

export default ModalButton;
