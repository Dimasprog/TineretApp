import React from 'react';
import FeedbackDisplay from '../../components/FeedbackDisplay';

function IdeaDisplayScreen ({navigation}) {
  return (
    <FeedbackDisplay title={'Idei'} theme={'idea'} navigation={navigation}/>
  )
}

export default IdeaDisplayScreen;
