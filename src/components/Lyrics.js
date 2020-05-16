import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  BackHandler,
} from 'react-native';
import {border} from '../../constants';
import {colors} from '../ColorSchemes';
import Orientation from 'react-native-orientation';
import Header from './Header';
import {SafeAreaView} from 'react-native-safe-area-context';

function Lyrics({navigation, route}) {
  useEffect(() => {
    Orientation.unlockAllOrientations();
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const {
    songHeaderTitle,
    songLyricsStyle,
    songLyrics,
    songHeaderTitleStyle,
  } = route.params;
  const {mainContainer, headerLine} = styles;

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <ScrollView style={mainContainer} showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={colors.status_bar.background} />
        <Header
          themeColor={colors.second_font}
          style={songHeaderTitleStyle}
          title={songHeaderTitle}
          pressEvent={() => navigation.goBack()}
        />
        <View style={headerLine} />
        <Text style={songLyricsStyle}>{songLyrics}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    padding: border.lateral_span,
  },
  headerLine: {
    backgroundColor: colors.second_font,
    marginTop: border.lateral_span / 2,
    height: 3,
    borderRadius: 3,
  },
});

export default Lyrics;
