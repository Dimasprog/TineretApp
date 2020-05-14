import React, {useState} from 'react';
import {Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {border, fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

function NameLabel(props) {
  const [name, setName] = useState('');
  const [placeHolder, setPlaceHolder] = useState('Numele...');

  const {rowContainer, textInputStyle, buttonContainer, buttonText} = styles;

  function onAnonimPressed() {
    setName('');
    setPlaceHolder('Anonim');
    props.onFinalizedEdit('Anonim');
    Keyboard.dismiss();
  }

  return (
    <View style={rowContainer}>
      <TextInput style={textInputStyle}
                 selectionColor={colors.alternative}
                 placeholderTextColor={colors.main_font}
                 keyboardAppearance={colors.keyboard_appearance}
                 placeholder={placeHolder}
                 value={name}
                 onFocus={() => {
                   setPlaceHolder('Numele...');
                   props.onFinalizedEdit('');
                 }}
                 onChangeText={name => {
                   setName({name});
                   props.onFinalizedEdit(name);
                 }}
      />

      <TouchableOpacity
        style={buttonContainer}
        activeOpacity={.6}
        onPress={() => onAnonimPressed()}>
        <Text style={buttonText}>{'Anonim'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 7.5,
    paddingHorizontal: border.lateral_span,
    elevation: 10,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5}
  },
  textInputStyle: {
    color: colors.main_font,
    fontFamily: Platform.OS === 'ios' ? null : fonts.rocko,
    padding: 0,
    width: wp(68) - border.lateral_span,
    fontSize: wp(5.2),
  },
  buttonContainer: {
    backgroundColor: colors.background,
    borderRadius: border.radius,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5}
  },
  buttonText: {
    color: colors.second_font,
    fontFamily: Platform.OS === 'ios' ? null : fonts.rounded,
    textAlign: 'center',
    padding: wp(0.5),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    fontSize: wp(4),
  },
});

export default NameLabel;
