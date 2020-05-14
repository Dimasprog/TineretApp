import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, AppState, Platform} from 'react-native';
import {fonts, border, text} from '../../constants';
import {colors} from '../ColorSchemes';
import StarRating from 'react-native-star-rating';
import ReviewModal from '../modals/ReviewModal';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function RatingCard(props) {
  const [infoText, setInfoText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [starCount, setStarCount] = useState(0);

  function onChangeRating(rating) {
    props.sendStarRating(props.title, rating);
    setStarCount(rating)
  }

  function onInfoPress(content) {
    setInfoText(displayContentText(content));
    setModalVisible(true);
  }

  function displayContentText(title) {
    let textContent;
    switch (title) {
      case 'Estetică':
        textContent = text.aesthetic;
        break;
      case 'Învățămînt':
        textContent = text.learning;
        break;
      case 'Sustragere de la realitate':
        textContent = text.abstraction;
        break;
      case 'Distracție':
        textContent = text.distraction;
        break;
    }
    return textContent;
  }

  const {
    mainContainer,
    titleContainer,
    titleText,
    infoButton,
    starRating,
    starStyle,
  } = styles;

  const gradient = {
    color: [
      colors.main,
      colors.alternative,
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

  useEffect(() => {
    AppState.addEventListener('change', () => {
      setModalVisible(false);
    })
  }, [])

  return (
    <LinearGradient style={mainContainer} colors={gradient.color} start={gradient.start} end={gradient.end}>

      <View style={titleContainer}>
        <Text style={titleText}>
          {props.title}
        </Text>
        <TouchableOpacity style={infoButton} onPress={() => onInfoPress(props.title)}>
          <Icon name={'info'} color={colors.main} size={wp(6)}/>
        </TouchableOpacity>
      </View>

      <StarRating
        containerStyle={starRating}
        rating={starCount}
        selectedStar={rating => onChangeRating(rating)}
        fullStarColor={'#ffcc00'}
        emptyStarColor={colors.empty_star_color}
        starSize={hp(6)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <ReviewModal
          changeModalVisibility={setModalVisible}
          infoText={infoText}
        />
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    borderTopRightRadius: border.radius,
    borderBottomRightRadius: border.radius,
    padding: border.lateral_span / 5,
    marginVertical: border.lateral_span / 5,
    justifyContent: 'space-evenly',
    elevation: 5,
    shadowColor: colors.shadow_color,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5}
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: border.lateral_span,
  },
  titleText: {
    color: colors.reviewCardTitle,
    fontFamily: Platform.OS === 'ios' ? null : fonts.rounded,
    fontSize: wp(5),
    marginLeft: border.lateral_span * 2,
  },
  starRating: {
    marginLeft: border.lateral_span * 2,
    width: '70%',
  },
});

export default RatingCard;
