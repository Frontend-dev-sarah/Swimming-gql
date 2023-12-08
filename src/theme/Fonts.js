import {StyleSheet} from 'react-native';
import Colors from './Colors';

const Fonts = StyleSheet.create({
  text: {
    color: Colors.white,
  },
  textBlack: {
    color: Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY,
  },
  title: {
    color: Colors.PRIMARY,
  },
  little: {
    fontSize: 12,
  },
  medium: {fontSize: 16},
  error: {color: Colors.ERROR},
  bold: {
    fontFamily: 'Lexend-Bold',
  },
  light: {
    fontFamily: 'Lexend-Light',
    fontWeight: '300',
  },
  thin: {
    fontFamily: 'Lexend-Thin',
  },
  fontAndra: {
    fontFamily: 'AndreaIIScriptUpright',
  },
  uppercase: {textTransform: 'uppercase'},
});

export default Fonts;

export const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Lexend-Regular',
      fontSize: 14,
    },
    medium: {
      fontFamily: 'Lexend-Regular',
    },
    light: {
      fontFamily: 'Lexend-Regular',
    },
    thin: {
      fontFamily: 'Lexend-Regular',
    },
  },
  android: {
    regular: {
      fontFamily: 'Lexend-Regular',
      fontSize: 14,
    },
    medium: {
      fontFamily: 'Lexend-Regular',
    },
    light: {
      fontFamily: 'Lexend-Regular',
    },
    thin: {
      fontFamily: 'Lexend-Regular',
    },
  },
};
