import {ActivityIndicator} from 'react-native';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {colors} from '../ColorSchemes';
import React from 'react';

function LoadingIndicator (props) {
  return (
    <ActivityIndicator size={hp(7)} color={colors.second_font} animating={props.loading}/>
  )
}

export default LoadingIndicator;
