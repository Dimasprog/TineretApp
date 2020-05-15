import React from 'react';
import SendText from '../../components/SendText';

function QuestionScreen({navigation}) {
  const questionActivityObject = {
    titleName: 'Acordă o întrebare',
    toastSuccess: 'Întrebarea a fost trimisă!',
    toastError: 'Întrebarea nu s-a trimis!',
    theme: 'question',
  };

  return (
    <SendText
      goBack={() => navigation.goBack()}
      activityObject={questionActivityObject}
    />
  );
}

export default QuestionScreen;
