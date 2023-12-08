import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import {
  FlatList,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

import Alignments from '../../theme/Alignments';
import AppStyle from '../../theme/AppStyle';
import Colors from '../../theme/Colors';
import AppImage from '../../utils/AppImage';
import {MENTIONS_LINK} from '../../utils/constants';
import i18n from '../../utils/localization/I18n';
import MenuItem from './components/MenuItem';
import Fonts from '../../theme/Fonts';
import CustomButton from '../../components/Button/CustomButton';
import UserContext from '../../contexts/UserContext';

export default function MenuPage({}) {
  const {logout} = useContext(UserContext);
  const isFocused = useIsFocused();

  // handle the statusbar text color on this page
  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        StatusBar.setBarStyle('light-content');
      }, 100);
    }
  }, [isFocused]);

  function pressMentions() {
    return Linking.openURL(MENTIONS_LINK);
  }

  return (
    <FlatList
      data={[
        'waterTemperature',
        'waterQuality',
        'filtration',
        'projector',
        'videoSurveillance',
        'priorityMode',
        'advices',
        'statistics',
        'myDealer',
        'appParams',
        'poolParams',
      ]}
      renderItem={({item}) => <MenuItem key={item} item={item} />}
      keyExtractor={item => item}
      contentContainerStyle={[styles.container, AppStyle.safeContainer]}
      style={styles.colorContainer}
      ListHeaderComponent={() => (
        <View style={[Alignments.row, Alignments.crossEnd]}>
          <Image
            source={AppImage.flamingo}
            style={styles.flamingo}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.myPool} onPress={pressMentions}>
              {i18n.t('app.myPool')}
            </Text>
            <Text style={styles.title} onPress={pressMentions}>
              {i18n.t('app.desjoyaux')}
            </Text>
          </View>
        </View>
      )}
      ListFooterComponent={() => (
        <>
          <Text style={styles.version}>{`${i18n.t('app.app')} - ${i18n.t(
            'app.version',
          )} ${DeviceInfo.getVersion()}`}</Text>
          <Text style={styles.mention} onPress={pressMentions}>
            {i18n.t('app.mentions')}
          </Text>
          <CustomButton
            text={i18n.t('auth.logout')}
            onPress={logout}
            red
            icon="power"
          />
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {paddingBottom: 24},
  colorContainer: {backgroundColor: Colors.PRIMARY},
  flamingo: {
    height: 70,
    marginLeft: 30,
    width: 65,
    marginTop: 20,
  },
  version: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
    color: Colors.TEXT_B_LIGHT_B_MEDIUM_EMPHASIS,
    ...Fonts.uppercase,
    ...Alignments.selfCenter,
    marginTop: 10,
  },
  mention: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
    color: Colors.white,
    ...Alignments.selfCenter,
    marginTop: 7,
    marginBottom: 14,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 26,
    ...Fonts.text,
    fontFamily: 'Lexend-ExtraLight',
  },
  titleContainer: {
    marginLeft: 18,
  },
  myPool: {
    fontSize: 20,
    color: Colors.white,
    lineHeight: 20,
    ...Fonts.fontAndra,
  },
});
