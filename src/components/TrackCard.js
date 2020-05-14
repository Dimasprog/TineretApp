import React from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {border} from '../../constants';
import {colors} from '../ColorSchemes';
import Lyrics from './Lyrics';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function TrackCard({song, lyrics, navigation}) {

  function openLyricsScreen() {
    const lyricsProps = {
      songHeaderTitleStyle: headerTitleStyle,
      songHeaderTitle: song,
      songLyricsStyle: lyricsStyle,
      songLyrics: lyrics
    }
    Keyboard.dismiss();
    navigation.navigate("Lyrics", lyricsProps);
  }

  function setTrackProperties(text) {
    const roman = "aeiouțșăâî";
    for (let i = 0; i < roman.length; i++)
      if (text.toLowerCase().includes(roman[i]))
        return {fontName: 'CMGSans-BoldRounded', fontSize: wp(6)};
    return {fontName: 'Rocko', fontSize: wp(6.5)};
  }

  const headerTitleStyle = {
    color: colors.main_font,
    // fontFamily: setTrackProperties(song).fontName,
    fontSize: setTrackProperties(song).fontSize,
    alignSelf: 'center',
  };

  const titleCardStyle = {
    color: colors.main_font,
    // fontFamily: setTrackProperties(song).fontName,
    fontSize: setTrackProperties(song).fontSize,
    paddingHorizontal: border.lateral_span,
    paddingVertical: border.top_span,
  };

  const lyricsStyle = {
    color: colors.second_font,
    // fontFamily: setTrackProperties(song).fontName,
    fontSize: setTrackProperties(song).fontSize + 1,
    marginTop: border.lateral_span,
    marginBottom: border.lateral_span * 2,
    textAlign: 'center',
  };

  const gradient = {
    color: [
      colors.main,
      colors.trackCardGradient,
    ],
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
    <TouchableOpacity style={iosElevation} activeOpacity={.7} onPress={() => openLyricsScreen()}>
      <LinearGradient style={touchableOpacity}
                      colors={gradient.color}
                      start={gradient.start}
                      end={gradient.end}
      >
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
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5}
  }
});

export default TrackCard;
