import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {border, fonts} from '../../constants';
import {colors} from '../ColorSchemes';
import Orientation from 'react-native-orientation';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function NoConnectionModal(props) {
  useEffect(() => {Orientation.lockToPortrait()}, []);

  function reloadScreen() {
    props.onReload();
    props.modalVisible(false);
  }

  const gradient = props.message.length > 25 ? [colors.background, colors.main] : [colors.main, colors.background];

  const {buttonsContainer, wifiIcon, mainContainer, textMessage} = styles;

  return(
    <LinearGradient colors={gradient} style={mainContainer}>
      <View style={wifiIcon}>
        <Icon
          type={'material-community'}
          name={'wifi-off'}
          size={wp(50)}
          color={colors.main_font}
        />
      </View>

      <Text style={textMessage}>
        {props.message}
      </Text>

      <View style={buttonsContainer}>
        <TouchableOpacity activeOpacity={.7} onPress={() => props.goBack()}>
          <Icon
            type={'material-community'}
            name={'home-circle'}
            size={wp(20)}
            color={colors.main_font}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.7} onPress={() => reloadScreen()}>
          <Icon
            name={'refresh'}
            size={wp(20)}
            color={colors.main_font}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: border.lateral_span,
    flex: 1,
  },
  wifiIcon: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    elevation: 10,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 10}
  },
  textMessage: {
    color: colors.second_font,
    // fontFamily: fonts.rounded,
    fontSize: wp(7),
    textAlign: 'center',
  },
  buttonsContainer: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(60),
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5}
  },
});

export default NoConnectionModal;
