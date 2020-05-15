import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {border, shadow} from '../../constants';
import {colors} from '../ColorSchemes';

function ActivityCard({picture, onPress}) {
  const {mainContainer, activityImage} = activityStyles;

  return (
    <TouchableOpacity
      style={mainContainer}
      onPress={onPress}
      activeOpacity={0.6}>
      <Image style={activityImage} source={picture} />
    </TouchableOpacity>
  );
}

const activityStyles = StyleSheet.create({
  mainContainer: {
    borderRadius: border.radius,
    justifyContent: 'center',
    height: '21%',
    marginBottom: border.lateral_span,
    elevation: 5,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  activityImage: {
    flex: 1,
    borderRadius: border.radius,
    width: undefined,
    height: undefined,
  },
});

export default ActivityCard;
