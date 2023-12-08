import React, {useContext} from 'react';
import {StyleSheet, ScrollView, Linking, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Alignments from '../../theme/Alignments';
import i18n from '../../utils/localization/I18n';
import {Card, Text, TouchableRipple} from 'react-native-paper';
import CustomButton from '../../components//Button/CustomButton';
import ManagementContext from '../../contexts/ManagementContext';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

export default function DealerPage({}) {
  const {dealer} = useContext(ManagementContext);

  function onPressAddress() {
    const url = Platform.select({
      ios: `maps:0,0?q=${`${dealer.address.address || ''}`}`,
      android: `geo:0,0?q=${`${dealer.address.address || ''}`}`,
    });
    url && Linking.openURL(url);
  }

  function onPressMail() {
    Linking.openURL(`mailto:${dealer?.mail}`);
  }

  function onPressWebsite() {
    Linking.openURL(`${dealer?.website}`);
  }

  return (
    <ScrollView
      style={[Alignments.fill]}
      contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text style={[styles.name, styles.marginBottom]}>{dealer?.name}</Text>
        <TouchableRipple style={[styles.marginBottom]} onPress={onPressAddress}>
          <Text>{dealer?.address}</Text>
        </TouchableRipple>
        <TouchableRipple
          style={[Alignments.rowCross, styles.marginBottom]}
          onPress={onPressMail}>
          <>
            <MaterialCommunityIcons
              name="email"
              size={24}
              color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
              style={{marginRight: 7}}
            />
            <Text style={[Alignments.selfCenter]}>{dealer?.mail}</Text>
          </>
        </TouchableRipple>
        <CustomButton
          text={i18n.t('auth.visitWebsite')}
          onPress={onPressWebsite}
          icon={'chevron-right'}
          textMode
          reverse
          customStyle={styles.webBtn}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 21,
    paddingHorizontal: 31,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  marginBottom: {
    marginBottom: 10,
  },
  name: {
    ...Fonts.bold,
    ...Fonts.medium,
  },
  webBtn: {
    alignSelf: 'flex-start',
    marginLeft: -20,
  },
});
