import React from 'react';
import SendText from '../../components/SendText';

function IdeaScreen ({navigation}) {

  const ideaActivityObject = {
    titleName: 'Trimite o idee',
    toastSuccess: 'Mesajul a fost trimis!',
    toastError: 'Mesajul nu s-a trimis!',
    theme: 'idea',
  };

  return (
    <SendText goBack={() => navigation.goBack()} activityObject={ideaActivityObject}/>
  );
}

export default IdeaScreen;
