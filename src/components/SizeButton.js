import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {border, fonts, shadow} from '../../constants';
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
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius - 2,
    shadowOffset: { width: 0, height: shadow.height - 2 },
  },
  sizeButtonText: {
    color: colors.main_font,
    fontFamily: fonts.rounded,
    textAlign: 'center',
    fontSize: wp(5),
  },
});

export default SizeButton;
