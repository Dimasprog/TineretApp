import React, {useEffect, useState} from 'react';
import {
  AppState,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {border, fonts, ratingCards, shadow} from '../../../constants';
import {colors} from '../../ColorSchemes';
import RatingCard from '../../components/RatingCard';
import EventPickerModal from '../../modals/EventPickerModal';
import MessageModal from '../../modals/MessageModal';
import Header from '../../components/Header';
import SendButton from '../../components/SendButton';
import NameLabel from '../../components/NameLabel';
import PostRequest from '../../models/PostRequest';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

let rating = {};

function ReviewScreen({navigation}) {
  const [isEventModalVisible, setEventModalVisible] = useState(false);
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [eventType, setEventType] = useState('Alege');
  const [message, setMessage] = useState('');

  const activityObject = {
    titleName: 'Transmite review',
    toastSuccess: 'Review-ul a fost trimis!',
    toastError: 'Review-ul nu s-a trimis!',
    theme: 'review',
  };

  function handleUserName(name) {
    setUserName(name);
  }

  function handleEventType(type) {
    setEventModalVisible(false);
    setEventType(type);
  }

  function handleReviewMessage(text) {
    setMessageModalVisible(true);
    setMessage(text);
  }

  function handleStarRating(key, value) {
    if (key === 'Estetică') {
      rating.aesthetic = value;
    }
    if (key === 'Învățămînt') {
      rating.learning = value;
    }
    if (key === 'Sustragere de la realitate') {
      rating.reality = value;
    }
    if (key === 'Distracție') {
      rating.distraction = value;
    }
  }

  function resetStarRating() {
    rating = {};
  }

  function getReviewMessage() {
    return {
      id: new Date().getTime().toString(),
      date: PostRequest.prototype.getDate(),
      name: userName ? userName : null,
      type: eventType,
      message,
      rating,
    };
  }

  function sendReview() {
    let body = getReviewMessage();
    let postRequest = new PostRequest(
      navigation.goBack,
      activityObject,
      resetStarRating,
    );
    postRequest.sendReviewEntity(body);
  }

  function onPowerButtonPressed() {
    setEventModalVisible(false);
    Keyboard.dismiss();
  }

  useEffect(() => {
    AppState.addEventListener('change', onPowerButtonPressed);
    return () => {
      AppState.removeEventListener('change', onPowerButtonPressed);
    };
  }, []);

  const {
    ratingContainer,
    pickerContainer,
    pickerTitle,
    pickerButtonText,
    pickerButton,
    mainContainer,
    bottomRowContainer,
  } = styles;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <View style={mainContainer}>
        <StatusBar
          barStyle={colors.status_bar.font_color}
          backgroundColor={colors.status_bar.background}
        />
        <Header
          themeColor={colors.second_font}
          title={activityObject.titleName}
          pressEvent={() => navigation.goBack()}
        />

        <NameLabel onFinalizedEdit={handleUserName} />

        <View style={pickerContainer}>
          <Text style={pickerTitle}>Evenimentul:</Text>

          <TouchableOpacity
            style={pickerButton}
            activeOpacity={0.6}
            onPress={() => setEventModalVisible(true)}>
            <Text style={pickerButtonText}>{eventType}</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            onBackdropPress={() => setEventModalVisible(false)}
            onBackButtonPress={() => setEventModalVisible(false)}
            visible={isEventModalVisible}>
            <EventPickerModal setEventType={handleEventType} />
          </Modal>
        </View>

        <View style={ratingContainer}>
          {ratingCards.map((card, i) => (
            <RatingCard
              sendStarRating={handleStarRating}
              key={i}
              title={card}
            />
          ))}
        </View>

        <View style={bottomRowContainer}>
          <SendButton
            title={' Mesaj '}
            pressEvent={() => handleReviewMessage()}
          />
          <SendButton title={'Trimite'} pressEvent={() => sendReview()} />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isMessageModalVisible}
          onBackButtonPress={() => setMessageModalVisible(false)}
          onBackdropPress={() => setMessageModalVisible(false)}>
          <MessageModal
            modalVisible={setMessageModalVisible}
            onSave={handleReviewMessage}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: border.lateral_span,
  },
  pickerContainer: {
    backgroundColor: colors.main,
    borderRadius: border.radius,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: border.lateral_span,
    elevation: 10,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  pickerTitle: {
    color: colors.main_font,
    fontFamily: fonts.rounded,
    textAlign: 'center',
    fontSize: wp(4.5),
  },
  pickerButton: {
    backgroundColor: colors.background,
    borderRadius: border.radius,
    alignSelf: 'center',
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: shadow.offset,
  },
  pickerButtonText: {
    color: colors.second_font,
    fontFamily: fonts.rounded,
    textAlign: 'center',
    padding: wp(0.5),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    fontSize: wp(4),
  },
  ratingContainer: {
    display: 'flex',
    backgroundColor: colors.main,
    borderRadius: border.radius,
    justifyContent: 'space-evenly',
    padding: border.lateral_span,
    marginBottom: -border.lateral_span,
    elevation: 15,
    shadowColor: shadow.color,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius * 2,
    shadowOffset: { width: 0, height: shadow.height - 2 },
  },
  bottomRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ReviewScreen;
