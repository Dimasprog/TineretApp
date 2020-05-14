import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {border, fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

function SendButton(props) {
  return (
    <TouchableOpacity style={styles.buttonContainer} activeOpacity={.6} onPress={() => props.pressEvent()}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: border.radius,
    backgroundColor: colors.main,
    marginTop: border.lateral_span,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5}
  },
  buttonText: {
    color: colors.main_font,
    fontFamily: Platform.OS === 'ios' ? null : fonts.rounded,
    textAlign: 'center',
    padding: border.lateral_span * 2,
    paddingBottom: 7,
    paddingTop: 7,
    fontSize: hp(4),
  },
});

export default SendButton;
