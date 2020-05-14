import React from 'react';
import {View, Text} from 'react-native';
import SendText from '../../components/SendText';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function QuestionScreen ({navigation}) {

  const questionActivityObject = {
    titleName: 'Acordă o întrebare',
    toastSuccess: 'Întrebarea a fost trimisă!',
    toastError: 'Întrebarea nu s-a trimis!',
    theme: 'question',
  };

  return (
    <SendText goBack={() => navigation.goBack()} activityObject={questionActivityObject}/>
  )
}

export default QuestionScreen;
