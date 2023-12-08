import React from 'react';
import {Image, StyleSheet} from 'react-native';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {Card, Text} from 'react-native-paper';
import Fonts from '../../theme/Fonts';
import i18n from '../../utils/localization/I18n';
import {screenWidth} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import RoutesNames from '../../navigation/RoutesNames';
import AppImage from '../../utils/AppImage';

const CARD_WIDTH = (screenWidth - 8 - 62) / 2;
const CARD_HEIGHT = CARD_WIDTH;

export default function CameraWidget() {
  const navigation = useNavigation();

  function onPressWidget() {
    navigation.navigate(RoutesNames.CameraPage);
  }

  return (
    <Card style={styles.container} onPress={onPressWidget}>
      <Text style={[Alignments.textCenter, Fonts.text]}>
        {i18n.t('menu.items.videoSurveillance')}
      </Text>
      <Image
        source={AppImage.camera}
        style={styles.camera}
        resizeMode="contain"
      />
      <Image
        source={AppImage.cameraTriangle}
        style={styles.cameraTriangle}
        resizeMode="stretch"
      />
      <Text style={[Alignments.textCenter, Fonts.text, styles.link]}>
        {i18n.t('videoSurveillance.look')}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    width: CARD_WIDTH,
    paddingTop: 7,
    height: CARD_HEIGHT,
    marginBottom: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.PASTEQUE,
  },
  link: {
    textDecorationLine: 'underline',
    marginTop: 'auto',
    marginBottom: 17,
  },
  switch: {
    marginHorizontal: 4,
  },
  camera: {width: '45%', zIndex: 1, ...Alignments.selfCenter},
  cameraTriangle: {
    width: '100%',
    position: 'absolute',
    height: CARD_HEIGHT * 0.6,
    bottom: 0,
  },
});
