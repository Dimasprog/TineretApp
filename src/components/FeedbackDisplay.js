import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {border, feedBack} from '../../constants';
import {colors} from '../ColorSchemes';
import Header from './Header';
import FeedbackCard from './FeedbackCard';
import ListModel from '../models/ListModel';
import SimpleToast from 'react-native-simple-toast';
import LoadingIndicator from './LoadingIndicator';

let listModel = new ListModel();

function FeedbackDisplay(props) {
  const [feedBackList, setFeedBackList] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const noDataErrorMessage =
    'TypeError: Object.values requires that input parameter not be null or undefined';
  const {mainContainer, listContainer, headerStyle} = styles;

  function HeaderLabel() {
    return (
      <View>
        <Header
          themeColor={colors.second_font}
          title={props.title}
          pressEvent={() => props.navigation.popToTop()}
        />
        {isLoading ? <LoadingIndicator props={isLoading} /> : null}
      </View>
    );
  }

  function handleBackButton() {
    props.navigation.popToTop();
    return true;
  }

  function displayFeedBackList(list) {
    listModel
      .getList(feedBack.url)
      .then(response => {
        if (list === 'question') {
          setFeedBackList(Object.values(response.question));
        }
        if (list === 'idea') {
          setFeedBackList(Object.values(response.idea));
        }
        if (list === 'review') {
          setFeedBackList(Object.values(response.review));
        }
      })
      .catch(err => {
        if (err.toString() !== noDataErrorMessage) {
          SimpleToast.show('Nui internet!', 500);
        } else {
          SimpleToast.show('Nici un feedback!', 500);
        }
      });
    setRefresh(false);
    setLoading(false);
  }

  async function refreshList() {
    await displayFeedBackList(props.theme);
    setRefresh(false);
  }

  useEffect(() => {
    displayFeedBackList(props.theme);
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);

  return (
    <LinearGradient
      style={mainContainer}
      colors={[colors.background, colors.main]}>
      <StatusBar
        barStyle={colors.status_bar.font_color}
        backgroundColor={colors.status_bar.background}
      />

      <SafeAreaView style={listContainer}>
        <FlatList
          ListHeaderComponent={<HeaderLabel />}
          ListHeaderComponentStyle={headerStyle}
          ListFooterComponent={
            <View style={{height: border.lateral_span / 2}} />
          }
          showsVerticalScrollIndicator={false}
          data={feedBackList.reverse()}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              colors={[colors.main]}
              onRefresh={() => refreshList()}
            />
          }
          renderItem={({item}) => (
            <FeedbackCard
              date={item.date}
              name={item.name}
              message={item.message}
              type={item.type}
              rating={item.rating}
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    padding: border.lateral_span,
    paddingBottom: border.lateral_span / 2,
    elevation: 5,
  },
  listContainer: {
    flex: 1,
  },
});

export default FeedbackDisplay;
