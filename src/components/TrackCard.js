import React from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {border, fonts, shadow} from '../../constants';
import {colors} from '../ColorSchemes';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function TrackCard({song, lyrics, navigation}) {
  function openLyricsScreen() {
    const lyricsProps = {
      songHeaderTitleStyle: headerTitleStyle,
      songHeaderTitle: song,
      songLyricsStyle: lyricsStyle,
      songLyrics: lyrics,
    };
    Keyboard.dismiss();
    navigation.navigate('Lyrics', lyricsProps);
  }

  function setTrackProperties(text) {
    const roman = 'aeiouțșăâî';
    for (let i = 0; i < roman.length; i++) {
      if (text.toLowerCase().includes(roman[i])) {
        return {fontName: fonts.rounded, fontSize: wp(6)};
      }
    }
    return {fontName: fonts.rocko, fontSize: wp(6.5)};
  }

  const headerTitleStyle = {
    color: colors.main_font,
    fontFamily: setTrackProperties(song).fontName,
    fontSize: setTrackProperties(song).fontSize,
    alignSelf: 'center',
  };

  const titleCardStyle = {
    color: colors.main_font,
    fontFamily: setTrackProperties(song).fontName,
    fontSize: setTrackProperties(song).fontSize,
    paddingHorizontal: border.lateral_span,
    paddingVertical: border.top_span,
  };

  const lyricsStyle = {
    color: colors.second_font,
    fontFamily: setTrackProperties(song).fontName,
    fontSize: setTrackProperties(song).fontSize + 1,
    marginTop: border.lateral_span,
    marginBottom: border.lateral_span * 2,
    textAlign: 'center',
  };

  const gradient = {
    color: [colors.main, colors.trackCardGradient],
    start: {
      x: 0,
      y: 1,
    },
    end: {
      x: 1,
      y: 1,
    },
  };

  const {touchableOpacity, iosElevation} = activityStyles;

  return (
    <TouchableOpacity
      style={iosElevation}
      activeOpacity={0.7}
      onPress={() => openLyricsScreen()}>
      <LinearGradient
        style={touchableOpacity}
        colors={gradient.color}
        start={gradient.start}
        end={gradient.end}>
        <Text style={titleCardStyle}>{song}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const activityStyles = StyleSheet.create({
  touchableOpacity: {
    borderRadius: border.radius,
    marginHorizontal: border.lateral_span,
    marginVertical: border.lateral_span / 2,
    elevation: 10,
  },
  iosElevation: {
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: { width: 0, height: shadow.height }
  },
});

export default TrackCard;
