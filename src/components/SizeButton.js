import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {border, fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function SizeButton(props) {
  return (
    <TouchableOpacity
      style={styles.sizeButton}
      activeOpacity={0.4}
      onPress={props.onPress}>
      <Text style={styles.sizeButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sizeButton: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    paddingHorizontal: border.lateral_span,
    paddingVertical: border.lateral_span / 2,
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 3},
  },
  sizeButtonText: {
    color: colors.main_font,
    fontFamily: Platform.OS === 'ios' ? null : fonts.rounded,
    textAlign: 'center',
    fontSize: wp(5),
  },
});

export default SizeButton;
