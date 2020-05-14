import React from 'react';
import FeedbackDisplay from '../../components/FeedbackDisplay';

function ReviewDisplayScreen ({navigation}) {
  return (
    <FeedbackDisplay title={'Review'} theme={'review'} navigation={navigation}/>
  )
}

export default ReviewDisplayScreen;
