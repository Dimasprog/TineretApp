import React, {useEffect, useState} from 'react';
import {
  AppState,
  BackHandler,
  FlatList,
  Keyboard,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {border, fonts, playList, shadow} from '../../../constants';
import {colors} from '../../ColorSchemes';
import TrackCard from '../../components/TrackCard';
import * as fs from 'react-native-fs';
import NoConnectionModal from '../../modals/NoConnectionModal';
import ListModel from '../../models/ListModel';
import LoadingIndicator from '../../components/LoadingIndicator';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

let listModel = new ListModel();
let isAccessToGoBack = true;

function AlbumScreen({navigation}) {
  const [trackList, setTrackList] = useState([]);
  const [inMemoryTrackList, setInMemoryTrackList] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [isClearTextInput, setIsClearTextInput] = useState(true);
  const [iconType, setIconType] = useState('search');
  const [searchLabelVisibility, setSearchLabelVisibility] = useState(false);
  const [isConnectionModalVisible, setConnectionModalVisible] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const noWifiConnectionMessage =
    'PENTRU A ÎNCĂRCA CÂNTĂRILE TREBUIE CONECȚIUNE DE INTERNET';

  function removeDiacritics(word) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function onBackPressed() {
    if (isAccessToGoBack) {
      navigation.goBack();
    } else {
      dismissSearch();
      displayTrackList();
    }
    return true;
  }

  function updateSearch(search) {
    setSearchedText(search);
    setIsClearTextInput(false);
    isAccessToGoBack = false;
    setIconType(search ? 'close' : 'search');

    const filteredTrackList = inMemoryTrackList.filter(track => {
      let trackLowercase = removeDiacritics(track.name.toLowerCase());
      let searchedTrackLowercase = search.toLowerCase();

      return trackLowercase.indexOf(searchedTrackLowercase) > -1;
    });

    setTrackList(filteredTrackList);
  }

  function dismissSearch() {
    Keyboard.dismiss();
    setSearchedText('');
    setIsClearTextInput(true);
    isAccessToGoBack = true;
    setIconType('search');
  }

  function loadTrackList(list) {
    setTrackList(list);
    setInMemoryTrackList(list);
  }

  async function installTrackList() {
    if (listModel.isInternet) {
      let serverTrackList = await listModel.getList(playList.url);
      await listModel.downloadList(playList);
      loadTrackList(serverTrackList);
      setSearchLabelVisibility(true);
    } else {
      setConnectionModalVisible(true);
    }
  }

  async function displayTrackList() {
    listModel.checkInternet();
    let serverTrackList = await listModel.getList(playList.url);

    fs.readFile(playList.local_path)
      .then(file => {
        let localTrackList = JSON.parse(file);

        if (listModel.isUpdatedList(localTrackList, serverTrackList)) {
          listModel.downloadList(playList);
          loadTrackList(serverTrackList);
        } else {
          loadTrackList(localTrackList);
        }

        setSearchLabelVisibility(true);
      })
      .catch(() => installTrackList());

    setRefresh(false);
    setLoading(false);
    !isClearTextInput ? dismissSearch() : null;
  }

  useEffect(() => {
    // fs.unlink(playList.local_path);
    displayTrackList();
    BackHandler.addEventListener('hardwareBackPress', onBackPressed);
    AppState.addEventListener('change', () => Keyboard.dismiss());
  }, []);

  const {
    headerContainer,
    searchButton,
    backButton,
    topContainer,
    searchContainer,
    searchInput,
    mainContainer,
  } = styles;

  return (
    <SafeAreaView style={mainContainer}>
      <StatusBar
        backgroundColor={colors.status_bar.background}
        barStyle={colors.status_bar.font_color}
      />
      <View style={headerContainer}>
        <View style={topContainer}>
          <TouchableOpacity
            style={backButton}
            onPress={() => onBackPressed()}>
            <Icon
              type={'material-community'}
              name={'arrow-left-circle'}
              size={wp(10)}
              color={colors.second_font}
            />
          </TouchableOpacity>

          <View style={searchContainer}>
            <TextInput
              style={searchInput}
              editable={searchLabelVisibility}
              selectionColor={colors.search_bar.input}
              keyboardAppearance={colors.keyboard_appearance}
              placeholderTextColor={colors.search_bar.input}
              placeholder={'Caută'}
              value={isClearTextInput ? searchedText : null}
              onChangeText={searchedText => updateSearch(searchedText)}
            />

            <TouchableOpacity
              style={searchButton}
              onPress={() => {
                dismissSearch();
                displayTrackList();
              }}>
              <Icon
                name={iconType}
                color={colors.search_bar.color}
                size={wp(7)}
              />
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? <LoadingIndicator props={isLoading} /> : null}
      </View>
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{marginBottom: 5}} />}
        ListFooterComponent={<View style={{height: border.lateral_span / 2}} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => displayTrackList()}
          />
        }
        keyExtractor={item => item.id.toString()}
        data={trackList.sort((a, b) => {
          let x = removeDiacritics(a.name.toLowerCase());
          let y = removeDiacritics(b.name.toLowerCase());
          return x < y ? -1 : x > y ? 1 : 0;
        })}
        renderItem={({item}) => (
          <TrackCard
            song={item.name}
            lyrics={item.lyrics}
            isBackAccess={isAccessToGoBack}
            navigation={navigation}
          />
        )}
      />

      <Modal
        onBackButtonPress={() => navigation.goBack()}
        style={{margin: 0}}
        transparent={true}
        visible={isConnectionModalVisible}>
        <NoConnectionModal
          modalVisible={setConnectionModalVisible}
          message={noWifiConnectionMessage}
          onReload={displayTrackList}
          goBack={() => navigation.goBack()}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: border.lateral_span,
    paddingBottom: border.lateral_span / 2,
  },
  searchContainer: {
    backgroundColor: colors.search_bar.background,
    borderRadius: border.radius,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: border.lateral_span / 2 - 1,
    elevation: 5,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  searchInput: {
    backgroundColor: colors.search_bar.background,
    color: colors.search_bar.color,
    fontFamily: fonts.medium,
    borderRadius: border.radius,
    width: wp(76),
    paddingLeft: wp(2.5),
    fontSize: wp(4.5),
    padding: 0,
  },
  searchButton: {
    marginRight: 3,
    padding: 1,
  },
  backButton: {
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius - 1,
    shadowOffset: { width: 0, height: shadow.height - 1 },
  },
});

export default AlbumScreen;
