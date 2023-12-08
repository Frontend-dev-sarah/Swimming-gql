import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import I18n from 'i18n-js';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import AppImage from '../../utils/AppImage';

export default function AuthLoadingPage({navigation}) {
  useEffect(() => {
    navigation?.setOptions({headerShown: false});
  }, [navigation]);

  return (
    <View style={[styles.container]}>
      <Image source={AppImage.child} style={styles.img} />
      <Image source={AppImage.logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.text1}>{I18n.t('app.liveYourPool')}</Text>
      <Text style={styles.text2}>{I18n.t('app.connected')}</Text>
      <ActivityIndicator color={Colors.SECONDARY} size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Alignments.fill,
    backgroundColor: Colors.white,
    ...Alignments.crossCenter,
  },
  img: {
    height: '66%',
    width: '100%',
  },
  logo: {width: '50%', marginTop: '-25%'},
  text1: {
    fontSize: 24,
    marginTop: -30,
    ...Fonts.light,
  },
  text2: {
    ...Fonts.fontAndra,
    fontSize: 35,
    marginBottom: 10,
  },
});
