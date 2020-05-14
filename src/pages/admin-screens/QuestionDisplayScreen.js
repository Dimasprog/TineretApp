import React from 'react';
import FeedbackDisplay from '../../components/FeedbackDisplay';

function QuestionDisplayScreen ({navigation}) {
  return (
    <FeedbackDisplay title={'Întrebări'} theme={'question'} navigation={navigation}/>
  )
}

export default QuestionDisplayScreen;
