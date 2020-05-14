import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import HomeScreen from '../user-screens/HomeScreen';
import AlbumScreen from '../user-screens/AlbumScreen';
import QuestionScreen from '../user-screens/QuestionScreen';
import ReviewScreen from '../user-screens/ReviewScreen';
import IdeaScreen from '../user-screens/IdeaScreen';
import LoginScreen from '../admin-screens/LoginScreen';
import FeedBackRoot from './FeedBackRoot';
import SettingsScreen from '../user-screens/SettingsScreen';
import Lyrics from '../../components/Lyrics';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Orientation from 'react-native-orientation';

function App() {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
        <Stack.Screen name="Lyrics" component={Lyrics} />
        <Stack.Screen name="Question" component={QuestionScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Idea" component={IdeaScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FeedBack" component={FeedBackRoot} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
