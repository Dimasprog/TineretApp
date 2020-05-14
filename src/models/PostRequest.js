import SimpleToast from 'react-native-simple-toast';
import {Keyboard} from 'react-native';
import {feedBack} from '../../constants';

export default class PostRequest {

  constructor(onBackPressed, activityObject, resetRating) {
    this.goBack = onBackPressed;
    this.activityObject = activityObject;
    this.resetRating = resetRating;
  }

  displayToastMessage(message) {
    Keyboard.dismiss();
    if (message === 'Alege evenimentul!' || message === 'Scrie numele!')
      SimpleToast.showWithGravity(message, SimpleToast.SHORT, SimpleToast.TOP);
    else if (message === 'Adaugă note!')
      SimpleToast.showWithGravity(message, SimpleToast.SHORT, SimpleToast.CENTER);
    else
      SimpleToast.showWithGravity(message, SimpleToast.SHORT, SimpleToast.BOTTOM);
  }

  getDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yy = today.getFullYear().toString().substring(2, 4);
    let h = today.getHours().toString().length === 1 ? '0' + today.getHours() : today.getHours();
    let m = today.getMinutes().toString().length === 1 ? '0' + today.getMinutes() : today.getMinutes();

    return dd + '/' + mm + '/' + yy + ' - ' + h + ':' + m;
  }

  sendMessageEntity(body) {
    if (body.name) {
      let api_url = feedBack.api_url + this.activityObject.theme + '.json';

      fetch(api_url, {
        method: 'POST',
        body: JSON.stringify(body),
      }).then((response) =>  {
        if (response.status === 200) {
          this.displayToastMessage(this.activityObject.toastSuccess);
          setTimeout(() => {this.goBack()}, 200);
        } else
          this.displayToastMessage(this.activityObject.toastError + '\nEroare cod: ' + response.status);
      }).catch((error) => {
        if (error.toString() === 'TypeError: Network request failed')
          this.displayToastMessage('Nui internet!');
        else
          this.displayToastMessage(this.activityObject.toastError)
      });

    } else
      this.displayToastMessage('Scrie numele!');
  }

  sendReviewEntity(body) {
    if (body.name) {
      if (body.type !== 'Alege') {
        if (Object.keys(body.rating).length === 4) {

          fetch(feedBack.api_url + this.activityObject.theme + '.json', {
            method: 'POST',
            body: JSON.stringify(body),
          }).then((response) => {
            if (response.status === 200) {
              this.displayToastMessage(this.activityObject.toastSuccess);
              setTimeout(() => {this.goBack()}, 200);
              this.resetRating();
            } else
              this.displayToastMessage(this.activityObject.toastError + '\nEroare cod: ' + response.status);
          }).catch((error) => {
            if (error.toString() === 'TypeError: Network request failed')
              this.displayToastMessage('Nui internet!');
            else {
              this.displayToastMessage(this.activityObject.toastError)
            }
          });

        } else
          this.displayToastMessage('Adaugă note!');
      } else
        this.displayToastMessage('Alege evenimentul!');
    } else
      this.displayToastMessage('Scrie numele!');
  }
}
