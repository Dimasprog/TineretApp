/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/pages/root/App';
import {name as appName} from './app.json';

console.reportErrorsAsExceptions = false;
AppRegistry.registerComponent(appName, () => App);
