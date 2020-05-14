import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {border, eventTypes, fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function EventPickerModal(props) {

  const {modalContainer, modalButton, modalButtonText} = styles;

  return (
    <View style={modalContainer}>
      {eventTypes.map((event, i) =>
        <TouchableOpacity
          style={modalButton}
          activeOpacity={.5}
          key={i}
          onPress={() => props.setEventType(event)}>
          <Text style={modalButtonText}>{event}</Text>
        </TouchableOpacity>
      )}
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
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {width: 0, height: 30}
  },
  modalButton: {
    backgroundColor: colors.background,
    borderRadius: border.radius,
    marginTop: border.lateral_span / 2,
    padding: wp(1),
    elevation: 10,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5}
  },
  modalButtonText: {
    color: colors.second_font,
    // fontFamily: fonts.rounded,
    textAlign: 'center',
    fontSize: hp(3),
  },
});

export default EventPickerModal;
