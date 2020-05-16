import React, {useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../ColorSchemes';
import {border, fonts, shadow} from '../../../constants';
import Header from '../../components/Header';
import AppInfoModal from '../../modals/AppInfoModal';
import Modal from 'react-native-modal';
import SizeButton from '../../components/SizeButton';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function SettingsScreen({navigation}) {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);

  function toggleDarkModeSwitch() {
    setDarkMode(prevState => !prevState);
  }

  const {
    mainContainer,
    settingText,
    rowContainer,
    buttonsSizeContainer,
  } = styles;

  return (
    <LinearGradient
      style={mainContainer}
      colors={[colors.main, colors.background]}>
      <StatusBar backgroundColor={colors.status_bar.main} />
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={{marginBottom: border.lateral_span / 2}}>
            <Header
              themeColor={colors.main_font}
              title={'Setări'}
              pressEvent={() => navigation.goBack()}
            />
          </View>

          <View style={rowContainer}>
            <Text style={settingText}>{'Mod noapte'}</Text>
            <Switch
              trackColor={{false: '#767577', true: colors.main}}
              thumbColor={isDarkMode ? colors.background : '#f4f3f4'}
              onValueChange={toggleDarkModeSwitch}
              value={isDarkMode}
            />
          </View>

          <View style={rowContainer}>
            <Text style={settingText}>Dimensiune text</Text>

            <View style={buttonsSizeContainer}>
              <SizeButton title={'Mic'} onPress={() => alert('Mic')} />
              <View style={{marginHorizontal: border.lateral_span}}>
                <SizeButton title={'Mediu'} onPress={() => alert('Mediu')} />
              </View>
              <SizeButton title={'Mare'} onPress={() => alert('Mare')} />
            </View>
          </View>

          <TouchableOpacity
            style={rowContainer}
            onPress={() => setInfoModalVisible(true)}>
            <Text style={settingText}>{'App info'}</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            onBackdropPress={() => setInfoModalVisible(false)}
            onBackButtonPress={() => setInfoModalVisible(false)}
            visible={isInfoModalVisible}>
            <AppInfoModal changeModalVisibility={setInfoModalVisible} />
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: border.lateral_span,
  },
  settingText: {
    fontSize: wp(5),
    fontFamily: fonts.rounded,
    color: colors.second_font,
  },
  rowContainer: {
    backgroundColor: colors.background,
    borderRadius: border.radius,
    marginVertical: border.lateral_span / 2,
    padding: border.lateral_span,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  buttonsSizeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SettingsScreen;
