import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Vibration,
  Platform,
} from 'react-native';
import ActivityCard from '../../components/ActivityCard';
import {images, text, border, fonts} from '../../../constants';
import {colors} from '../../ColorSchemes';
import Orientation from 'react-native-orientation';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function HomeScreen({navigation}) {
  useEffect(() => {
    Orientation.lockToPortrait();
    SplashScreen.hide();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  function switchScreen(screen) {
    return () => {
      screen === 'Login' ? Vibration.vibrate(30) : null;
      navigation.navigate(screen);
    };
  }

  const {
    headerContainer,
    headerTitle,
    logoStyle,
    activityContainer,
    mainContainer,
    copyRightText,
  } = styles;

  return (
    <LinearGradient
      colors={[colors.main, colors.background]}
      style={mainContainer}>
      <StatusBar
        backgroundColor={colors.status_bar.alternative}
        barStyle={'light-content'}
      />
      <SafeAreaView style={{marginBottom: hp(3)}}>
        <View style={headerContainer}>
          <TouchableOpacity onLongPress={switchScreen('Login')}>
            <Image source={images.logo} style={logoStyle} />
          </TouchableOpacity>

          <Text style={headerTitle}>{'Tineret BETANIA'}</Text>

          <TouchableOpacity onPress={switchScreen('Settings')}>
            <Icon
              type={'material-community'}
              name={'settings'}
              color={'white'}
              size={wp(7)}
            />
          </TouchableOpacity>
        </View>

        <View style={activityContainer}>
          <ActivityCard
            picture={images.album}
            onPress={switchScreen('Album')}
          />
          <ActivityCard
            picture={images.question}
            onPress={switchScreen('Question')}
          />
          <ActivityCard picture={images.idea} onPress={switchScreen('Idea')} />
          <ActivityCard
            picture={images.review}
            onPress={switchScreen('Review')}
          />
        </View>
        <Text style={copyRightText}>{text.copyRight}</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: border.top_span,
    paddingHorizontal: border.lateral_span,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: border.top_span,
  },
  headerTitle: {
    fontFamily: fonts.rounded,
    color: 'white',
    textAlign: 'center',
    fontSize: wp(6),
  },
  logoStyle: {
    borderRadius: wp(10),
    width: wp(18),
    height: wp(18),
  },
  activityContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  copyRightText: {
    color: colors.copy_right,
    fontFamily: Platform.OS === 'ios' ? undefined : fonts.thin,
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: wp(3),
    bottom: 0,
  },
});

export default HomeScreen;
