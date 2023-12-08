import {Dimensions} from 'react-native';
import I18n from 'i18n-js';

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);

export const MENTIONS_LINK = 'https://www.google.com';

export const glitchDSN =
  'https://5654ced380c54e30b8ad6b2086c5da06@glitch.mld-recette.fr/7';

export const monthes = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Jui',
  'Aou',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const PRIORITY_MODE = {
  filtration: 0,
  heatPump: 1,
  electrolyser: 2,
};

export const HOURS = [
  '0:30',
  '1:00',
  '1:30',
  '2:00',
  '2:30',
  '3:00',
  '3:30',
  '4:00',
  '4:30',
  '5:00',
  '5:30',
  '6:00',
  '6:30',
  '7:00',
  '7:30',
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
  '00:00',
];
