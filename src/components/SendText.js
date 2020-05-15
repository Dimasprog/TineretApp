import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  StatusBar,
  View,
  AppState,
  Keyboard,
  Platform,
} from 'react-native';
import {border, fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import LinearGradient from 'react-native-linear-gradient';
import Header from './Header';
import SendButton from './SendButton';
import NameLabel from './NameLabel';
import PostRequest from '../models/PostRequest';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function SendText(props) {
  const [textInputData, setTextInputData] = useState('');
  const [userName, setUserName] = useState('');

  function getFeedBackMessage(message) {
    return {
      id: new Date().getTime().toString(),
      date: PostRequest.prototype.getDate(),
      name: userName ? userName : null,
      message,
    };
  }

  function sendText(txtObject) {
    let message = txtObject.textInputData;
    if (message) {
      let feedBackMessage = getFeedBackMessage(message);
      let postRequest = new PostRequest(props.goBack, props.activityObject);
      postRequest.sendMessageEntity(feedBackMessage);
    }
  }

  function setCallBackUserName(name) {
    setUserName(name);
  }

  useEffect(() => {
    AppState.addEventListener('change', () => Keyboard.dismiss());
  }, []);

  const {textInput, mainContainer} = styles;

  return (
    <LinearGradient
      style={mainContainer}
      colors={[colors.background, colors.main]}>
      <StatusBar
        barStyle={colors.status_bar.font_color}
        backgroundColor={colors.status_bar.background}
      />
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={{marginBottom: border.lateral_span / 2}}>
            <Header
              themeColor={colors.second_font}
              title={props.activityObject.titleName}
              pressEvent={() => props.goBack()}
            />
          </View>

          <NameLabel onFinalizedEdit={setCallBackUserName} />

          <TextInput
            style={textInput}
            multiline={true}
            selectionColor={colors.alternative}
            keyboardAppearance={colors.keyboard_appearance}
            value={textInputData}
            onChangeText={textInputData => setTextInputData({textInputData})}
          />

          <SendButton
            title={'Trimite'}
            pressEvent={() => sendText(textInputData)}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: border.lateral_span,
  },
  textInput: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    color: colors.main_font,
    fontFamily: Platform.OS === 'ios' ? null : fonts.thin,
    textAlignVertical: 'top',
    height: '50%',
    marginTop: border.lateral_span,
    padding: border.lateral_span * 2,
    fontSize: wp(5),
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
  },
});

export default SendText;
