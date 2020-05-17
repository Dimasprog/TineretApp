import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {border, eventTypes, fonts, shadow} from '../../constants';
import {colors} from '../ColorSchemes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function EventPickerModal(props) {
  const {modalContainer, modalButton, modalButtonText} = styles;

  return (
    <View style={modalContainer}>
      {eventTypes.map((event, i) => (
        <TouchableOpacity
          style={modalButton}
          activeOpacity={0.5}
          key={i}
          onPress={() => props.setEventType(event)}>
          <Text style={modalButtonText}>{event}</Text>
        </TouchableOpacity>
      ))}
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
    padding: border.lateral_span,
    elevation: 30,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius * 6,
    shadowOffset: { width: 0, height: shadow.height * 6 },
  },
  modalButton: {
    backgroundColor: colors.background,
    borderRadius: border.radius,
    marginTop: border.lateral_span / 2,
    padding: wp(1),
    elevation: 10,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  modalButtonText: {
    color: colors.second_font,
    fontFamily: fonts.rounded,
    textAlign: 'center',
    fontSize: hp(3),
  },
});

export default EventPickerModal;
