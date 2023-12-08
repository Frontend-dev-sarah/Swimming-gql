import {StyleSheet} from 'react-native';
import {configureFonts, DefaultTheme} from 'react-native-paper';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

import Colors from './Colors';
import {fontConfig} from './Fonts';
import Alignments from './Alignments';

const AppStyle = StyleSheet.create({
  form: {
    paddingHorizontal: 30,
  },
  safeContainer: {
    paddingTop: getStatusBarHeight(),
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    marginLeft: 10,
  },
  btn: {
    height: 30,
    ...Alignments.selfCenter,
    paddingHorizontal: 5,
    borderColor: Colors.PRIMARY,
  },
  btnRed: {
    backgroundColor: Colors.ERROR,
  },
  btnGreen: {
    backgroundColor: Colors.SUCCESS_B_DARK,
  },
  btnRedOutlined: {
    borderColor: Colors.ERROR,
  },
  btnGreenOutlined: {
    borderColor: Colors.SUCCESS_B_DARK,
  },
  safeTopMargin: {
    marginTop: getStatusBarHeight(),
  },
  safeBottomPadding: {
    paddingBottom: getBottomSpace(),
  },
  headerImage: {
    height: 24,
    width: 24,
  },
  textField: {backgroundColor: Colors.white},
});

export default AppStyle;

export const headerStyle = {
  headerStyle: {
    backgroundColor: Colors.PRIMARY,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: Colors.white,
    fontFamily: 'Lexend-Regular',
  },
  headerBackTitleStyle: {color: Colors.white},
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
};

export const paperTheme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    card: Colors.white,
    text: Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY,
    background: Colors.BACKGROUND_DEFAULT,
    surface: Colors.white,
    accent: Colors.PRIMARY,
  },
  Card: {
    backgroundColor: Colors.PRIMARY,
  },
  fonts: configureFonts(fontConfig),
};
