import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {fonts, isTablet} from '../../../constants';
import {colors} from '../../ColorSchemes';
import QuestionDisplayScreen from '../admin-screens/QuestionDisplayScreen';
import IdeaDisplayScreen from '../admin-screens/IdeaDisplayScreen';
import ReviewDisplayScreen from '../admin-screens/ReviewDisplayScreen';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function FeedBackRoot() {
  const Tab = createBottomTabNavigator();

  const tabNavigatorStyle = {
    activeTintColor: colors.second_font,
    activeBackgroundColor: colors.background,
    inactiveTintColor: colors.main_font,
    style: {
      backgroundColor: colors.main,
      borderColor: colors.main,
    },
    labelStyle: {
      fontSize: wp(isTablet ? 4.5 : 6),
      fontFamily: fonts.rounded,
    },
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator tabBarOptions={tabNavigatorStyle}>
        <Tab.Screen name="Întrebări" component={QuestionDisplayScreen} />
        <Tab.Screen name="Idei" component={IdeaDisplayScreen} />
        <Tab.Screen name="Review" component={ReviewDisplayScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default FeedBackRoot;
