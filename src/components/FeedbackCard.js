import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {border, fonts, shadow} from '../../constants';
import {colors} from '../ColorSchemes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function FeedbackCard(props) {
  const tabs = Platform.OS === 'ios' ? '\t\t\t\t' : '\t\t\t\t\t';
  const {
    mainContainer,
    topContainer,
    topTextStyle,
    typeStyle,
    messageStyle,
    ratingStyle,
    ratingContainer,
  } = styles;

  return (
    <View style={mainContainer}>
      <View style={topContainer}>
        <Text style={topTextStyle}>{props.date}</Text>
        <Text style={topTextStyle}>{props.name}</Text>
      </View>

      {props.type ? <Text style={typeStyle}>{props.type}</Text> : null}

      {props.message ? <Text style={messageStyle}>{props.message}</Text> : null}

      {props.rating ? (
        <View>
          <View style={ratingContainer}>
            <Text style={ratingStyle}>
              {'Estetică: ' + props.rating.aesthetic + tabs}
            </Text>
            <Text style={ratingStyle}>
              {'Învățămînt: ' + props.rating.distraction}
            </Text>
          </View>
          <View style={ratingContainer}>
            <Text style={ratingStyle}>
              {'Sustragere: ' + props.rating.learning + '\t\t\t'}
            </Text>
            <Text style={ratingStyle}>
              {'Distracție: ' + props.rating.reality}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    borderRadius: border.radius,
    padding: border.lateral_span,
    marginHorizontal: border.lateral_span,
    marginVertical: border.lateral_span / 2,
    elevation: 10,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topTextStyle: {
    fontFamily: fonts.medium,
    color: colors.second_font,
    fontSize: wp(4),
  },
  typeStyle: {
    fontFamily: fonts.rounded,
    color: colors.second_font,
    fontSize: wp(4),
  },
  messageStyle: {
    fontFamily: Platform.OS === 'ios' ? null : fonts.xthin,
    color: colors.second_font,
    marginVertical: hp(1.5),
    fontSize: wp(4),
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  ratingStyle: {
    fontFamily: Platform.OS === 'ios' ? null : fonts.rocko,
    color: colors.second_font,
    fontSize: wp(4),
  },
});

export default FeedbackCard;
