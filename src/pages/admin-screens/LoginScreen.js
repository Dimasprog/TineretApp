import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, StatusBar, AppState} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {border, fonts, admins} from '../../../constants';
import {colors} from '../../ColorSchemes';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ListModel from '../../models/ListModel';
import NoConnectionModal from '../../modals/NoConnectionModal';
import SimpleToast from 'react-native-simple-toast';
import Header from '../../components/Header';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

let listModel = new ListModel();

function LoginScreen ({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function openFeedbackScreen() {
    navigation.navigate("FeedBack");
  }

  async function getAdminList() {
    let serverAdminList = await listModel.getList(admins.url);
    let list = [];

    for (let admin of serverAdminList)
      list.push(admin.name + ' ' + admin.password);

    if (list !== [])
      return list;
    else
      setModalVisible(true);
    return []
  }

  async function isValidLogin(name, password) {
    let adminList = await getAdminList();
    let adminCredentials = name + ' ' + password;

    return adminList.includes(adminCredentials);
  }

  async function login(log, pass) {
    Keyboard.dismiss();
    let name = Object.values(log).toString()
    let password = Object.values(pass).toString()

    await listModel.checkInternet();
    if (listModel.isInternet)
      if (await isValidLogin(name, password))
        openFeedbackScreen();
      else if (!name && !password)
          SimpleToast.show('Introduceți numele și parola!');
      else if (!name)
          SimpleToast.show('Introduceți numele!');
      else if (!password)
          SimpleToast.show('Introduceți parola!')
      else
          SimpleToast.show('Autentificare invalidă!');
    else
      setModalVisible(true);
  }

  const gradient = {
    color: [
      colors.main,
      colors.background,
    ],
    start: {
      x: 0,
      y: 1,
    },
    end: {
      x: 1,
      y: 1
    },
  };

  const {mainContainer, loginInput, loginContainer, accessButton, accessButtonText} = styles;

  useEffect(() => {
    AppState.addEventListener('change', () => Keyboard.dismiss());
  }, [])

  return (
    <LinearGradient style={mainContainer} colors={[colors.main, colors.background]}>
      <StatusBar backgroundColor={colors.status_bar.main}/>
      <SafeAreaProvider><SafeAreaView>
      <Header themeColor={colors.main_font} title={'Administrator Login'} pressEvent={() => navigation.goBack()}/>

      <LinearGradient style={loginContainer}
                      colors={gradient.color}
                      start={gradient.start}
                      end={gradient.end}
      >
        <TextInput style={loginInput}
                   autoCapitalize={'none'}
                   placeholder={'Nume'}
                   placeholderTextColor={colors.placeholderColor}
                   selectionColor={colors.alternative}
                   keyboardAppearance={colors.keyboard_appearance}
                   defaultValue={name}
                   onChangeText={name => setName({name})}
        />

        <TextInput style={loginInput}
                   secureTextEntry={true}
                   autoCapitalize={'none'}
                   placeholder={'Parolă'}
                   placeholderTextColor={colors.placeholderColor}
                   selectionColor={colors.alternative}
                   keyboardAppearance={colors.keyboard_appearance}
                   defaultValue={password}
                   onChangeText={password => setPassword({password})}
        />

        <TouchableOpacity style={accessButton} onPress={() =>  login(name, password)}>
          <Text style={accessButtonText}>Intră</Text>
        </TouchableOpacity>

        <Modal onBackButtonPress={() => navigation.goBack()}
               style={{margin: 0}}
               transparent={true}
               visible={modalVisible}>
          <NoConnectionModal modalVisible={setModalVisible}
                             message={'CONECTEAZĂ INTERNETUL'}
                             onReload={() => login(name, password)}
                             goBack={() => navigation.navigate("Home")}
          />
        </Modal>

      </LinearGradient>
      </SafeAreaView></SafeAreaProvider>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: border.lateral_span,
  },
  loginContainer: {
    borderRadius: border.radius,
    padding: border.lateral_span,
    marginTop: wp(30),
    elevation: 10,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 10},
  },
  loginInput: {
    backgroundColor: colors.background,
    color: colors.second_font,
    borderRadius: border.radius,
    marginBottom: border.lateral_span,
    // fontFamily: fonts.xthin,
    paddingLeft: border.lateral_span,
    fontSize: wp(6),
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
  },
  accessButton: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    // fontFamily: fonts.rounded,
    padding: border.lateral_span / 1.3,
    paddingHorizontal: border.lateral_span,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
  },
  accessButtonText: {
    color: colors.main_font,
    // fontFamily: fonts.rounded,
    fontSize: wp(7),
  },
});

export default LoginScreen;
