import React, {useState} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {border, fonts, shadow} from '../../constants';
import {colors} from '../ColorSchemes';
import ModalButton from '../components/ModalButton';
import * as NetInfo from '@react-native-community/netinfo';
import SimpleToast from 'react-native-simple-toast';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function MessageModal(props) {
  const [textInputData, setTextInputData] = useState('');

  function onSaveMessage() {
    let message = Object.values(textInputData).toString();

    NetInfo.fetch().then(state => {
      if (message) {
        if (!state.isConnected) {
          SimpleToast.showWithGravity(
            'Conectează internetul pentru a salva mesajul!',
            SimpleToast.LONG,
            SimpleToast.TOP,
          );
        } else {
          props.onSave(message);
          SimpleToast.showWithGravity(
            'Salvat!',
            SimpleToast.SHORT,
            SimpleToast.CENTER,
          );
          props.modalVisible(false);
        }
      } else {
        props.modalVisible(false);
      }
    });
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        multiline={true}
        placeholder={'Scrie...'}
        placeholderTextColor={colors.main_font}
        selectionColor={colors.alternative}
        keyboardAppearance={colors.keyboard_appearance}
        value={textInputData}
        onChangeText={textInputData => setTextInputData({textInputData})}
      />
      <ModalButton title={'Salvează'} onPress={() => onSaveMessage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: wp(80),
    marginBottom: Platform.OS === 'ios' ? hp(30) : null,
    padding: 10,
    elevation: 5,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  textInput: {
    color: colors.main_font,
    minHeight: hp(30),
    maxHeight: hp(45),
    fontFamily: fonts.xthin,
    textAlignVertical: 'top',
    fontSize: wp(5),
  },
});

export default MessageModal;
