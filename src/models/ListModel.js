import * as NetInfo from '@react-native-community/netinfo';
import * as fs from 'react-native-fs';

export default class ListModel {
  constructor() {
    this.isInternet = false;
    this.checkInternet();
  }

  async getList(url) {
    try {
      let response = await fetch(url);
      return response.json();
    } catch (e) {
      return [];
    }
  };

  async downloadList(file) {
    await fs.downloadFile({
      fromUrl: file.url,
      toFile: file.local_path,
    })
  };

  getListLength(list) {
    let listLength = 0;

    for (let i = 0; i < list.length; i++)
      listLength += Object.values(list[i]).toString().length;

    return listLength
  }

  isUpdatedList(oldList, newList) {
    if (this.isInternet) {
      let oldLength = this.getListLength(oldList);
      let newLength = this.getListLength(newList);

      return oldLength !== newLength;
    }
    return false
  }

  checkInternet() {
    NetInfo.fetch().then(state => {
      this.isInternet = state.isConnected;
    });
  };
}
