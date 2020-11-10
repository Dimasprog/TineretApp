import * as fs from 'react-native-fs';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from "./src/ColorSchemes";
import {Dimensions} from "react-native";

export const playList = {
  url: 'https://***.firebaseio.com/list.json',
  local_path: fs.DocumentDirectoryPath + '/Track_List.json',
};

export const admins = {
  url: 'https://***.firebaseio.com/authentication.json',
};

export const feedBack = {
  url: 'https://***.firebaseio.com/feed.json',
  api_url: 'https://tineretapp.firebaseio.com/feedback/',
};

export const eventTypes = [
  'Tineret',
  'Tineret în Oraș',
  'Grup de Creștere',
  'Conducerea slujirii de seară',
  'Malcishnik',
  'Devishnik',
  'Ajutor Social',
  'Călătorie',
  'Tabără',
  'Volei',
  'Altele'
];

export const ratingCards = [
  'Estetică',
  'Învățămînt',
  'Sustragere de la realitate',
  'Distracție',
];

export const images = {
  album: require('./src/assets/activity-pictures/album.png'),
  question: require('./src/assets/activity-pictures/questions.png'),
  review: require('./src/assets/activity-pictures/review.png'),
  idea: require('./src/assets/activity-pictures/ideas.png'),

  logo: require('./src/assets/logo/_logo_tineret.png'),
};

export const fonts = {
  rounded: 'CMGSans-BoldRounded',
  medium: 'CMGSans-SemiBoldItalic',
  thin: 'CMGSans-MediumItalic',
  xthin: 'CMGSans-LightItalic',
  cronus: 'Cronus-Italic',
  rocko: 'HouschkaRounded-Bold',
  nunito: 'Nunito-Light',
};

export const text = {
  copyRight: '© 2020 Dima Tronciu\nToate drepturile sunt rezervate',

  aesthetic:
    'Reprezintă totalitatea lucrurilor care răspund de frumusețe. De exemplu calitatea și ideea decorului, aranjarea, iluminarea și restul. Tot aici se consideră și aranjamentul inventarului, mesele, scaunele, scena!',
  learning:
    'Reprezintă totalitatea informației noi din această întâlnire acumulată prin predică, training, interview, discuții. Aici se include orice gen de activitate care te-a făcut să afli ceva nou și ziditor!',
  abstraction:
    'Aici se poate observa cât de bine tea ajutat atmosfera să te sustragi sau să te abați de la rutina zilnică și să te concentrezi la eveniment.',
  distraction:
    'Reprezintă cât de mult tu ai avut parte de odihnă prin distracție. Se ia în considerare activitățile sau diferite interactive care ți-au adus sentimente pozitive provocate de jocuri, glume-legume, discuții și așa mai departe!',
};

export const border = {
  radius: hp(3),
  lateral_span: 10,
  top_span: 15,
};

const shadowCoefficient = 2;

export const shadow = {
  color: colors.shadow_color,
  opacity: 1,
  radius: shadowCoefficient + 1,
  offset: {
    width: 0,
    height: shadowCoefficient
  },
  height: shadowCoefficient
}

export const isTablet = Dimensions.get("window").height / Dimensions.get("window").width < 1.6;
