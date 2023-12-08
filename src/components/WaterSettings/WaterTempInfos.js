import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import I18n from 'i18n-js';

import ManagementContext from '../../contexts/ManagementContext';
import Alignments from '../../theme/Alignments';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

export default function WaterTempInfos() {
  const {weather, water, devices} = useContext(ManagementContext);

  return (
    <View style={[Alignments.rowBetween, styles.padding]}>
      <View style={[Alignments.center]}>
        <Text style={[styles.outsideTemp]}>{I18n.t('myPool.outsideTemp')}</Text>
        <Text style={[styles.outsideDegrees]}>{`${weather?.temp || '-'}${I18n.t(
          'myPool.celsius',
        )}`}</Text>
      </View>
      <View style={styles.separator} />
      <View style={[Alignments.center]}>
        <Text style={[styles.outsideTemp]}>{I18n.t('myPool.myPool')}</Text>
        <Text style={[styles.outsideDegrees]}>{`${
          water?.temp?.actualTemp || '-'
        }${I18n.t('myPool.celsius')}`}</Text>
        {devices?.heatPump ? (
          <Text style={[styles.target, Fonts.textBlack]}>{`${I18n.t(
            'myPool.target',
          )} : ${water?.temp?.targetTemp || '-'}${I18n.t(
            'myPool.celsius',
          )}`}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outsideTemp: {
    marginTop: 17,
    ...Fonts.fontAndra,
    fontSize: 20,
    color: Colors.TEXT_A_DARK_B_MEDIUM_EMPHASIS_TEXT_SECONDARY,
  },
  outsideDegrees: {
    fontSize: 34,
    lineHeight: 42,
    ...Fonts.light,
    color: Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY,
  },
  target: {
    ...Fonts.little,
    color: Colors.TEXT_A_DARK_B_MEDIUM_EMPHASIS_TEXT_SECONDARY,
    ...Fonts.light,
  },
  separator: {
    backgroundColor: Colors.PALETTE_08_GREY_300,
    width: 1,
    height: '90%',
  },
  padding: {
    paddingHorizontal: '15%',
  },
});
