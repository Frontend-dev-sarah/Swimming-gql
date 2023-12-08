import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Card, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ManagementContext from '../../contexts/ManagementContext';
import RoutesNames from '../../navigation/RoutesNames';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import AppImage from '../../utils/AppImage';
import i18n from '../../utils/localization/I18n';
import RunningStateIndicator from '../RunningState/RunningStateIndicator';

const phRange = [6.6, 7.2, 8.6, 8.4];
const clRange = [1.5, 3.0, 7.6, 8.6];

export default function WaterQualityIndicator({noNavigation, customStyle}) {
  const navigation = useNavigation();
  const {water, devices} = useContext(ManagementContext);

  function renderIndicator({legend, value, range, style}) {
    return (
      <View style={[styles.rowContainer, style]}>
        <Text style={styles.legend}>{legend}</Text>
        {value && devices?.electrolyser ? (
          <View style={[styles.frieze]}>
            <View style={[styles.cursor]}>
              <Text style={styles.indicatorValue}>{value}</Text>
              <MaterialCommunityIcons
                name={'map-marker'}
                size={16}
                color={Colors.SUCCESS_A_MAIN}
              />
            </View>
            <View style={styles.indicatorCtnr}>
              <View style={[styles.indicatorView, styles.red]} />
              <Text style={styles.scaleValue}>
                {parseFloat(range[0]).toFixed(1)}
              </Text>
            </View>
            <View style={styles.indicatorCtnr}>
              <View style={[styles.indicatorView, styles.orange]} />
              <Text style={styles.scaleValue}>
                {parseFloat(range[1]).toFixed(1)}
              </Text>
            </View>
            <View style={[styles.indicatorCtnr, styles.flex2]}>
              <View style={[styles.indicatorView, styles.green]} />
              <Text style={styles.scaleValue}>
                {parseFloat(range[2]).toFixed(1)}
              </Text>
            </View>
            <View style={styles.indicatorCtnr}>
              <View style={[styles.indicatorView, styles.orange]} />
              <Text style={styles.scaleValue}>
                {parseFloat(range[3]).toFixed(1)}
              </Text>
            </View>
            <View style={styles.indicatorCtnr}>
              <View style={[styles.indicatorView, styles.red]} />
            </View>
          </View>
        ) : (
          renderEmptyPlaceHolder()
        )}
      </View>
    );
  }

  function renderEmptyPlaceHolder() {
    return (
      <View style={[styles.emptyCtnr]}>
        <Text style={styles.empty}>{i18n.t('waterQuality.noData')}</Text>
      </View>
    );
  }

  return (
    <Card
      style={[styles.container, customStyle]}
      onPress={() =>
        !noNavigation ? navigation.navigate(RoutesNames.WaterQualityPage) : null
      }>
      <View style={styles.titleCtnr}>
        <Image
          source={AppImage.waterIconBlack}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>{i18n.t('waterQuality.waterQuality')}</Text>
        {!noNavigation ? (
          <MaterialCommunityIcons
            name={'chevron-right'}
            size={24}
            style={[styles.chevron]}
            color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
          />
        ) : null}
      </View>
      {renderIndicator({
        legend: i18n.t('waterQuality.ph'),
        value: water?.quality?.ph,
        range: phRange,
      })}
      {renderIndicator({
        legend: i18n.t('waterQuality.cl'),
        value: water?.quality?.chlorine,
        range: clRange,
        style: {marginTop: -25},
      })}
      {devices?.electrolyser ? (
        <RunningStateIndicator
          item={i18n.t('waterQuality.electrolyser')}
          running={water?.quality?.electrolyserStatus}
        />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 22,
    marginHorizontal: 30,
    marginTop: 16,
  },
  titleCtnr: {
    ...Alignments.rowCenter,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
    width: 24,
    height: 24,
  },
  chevron: {
    position: 'absolute',
    right: 5,
  },
  rowContainer: {
    ...Alignments.rowCenter,
    paddingHorizontal: 25,
  },
  legend: {...Fonts.medium, marginRight: 15, ...Fonts.light, marginBottom: 15},
  indicatorView: {
    height: 3,
  },
  red: {
    backgroundColor: Colors.ERROR,
  },
  orange: {
    backgroundColor: Colors.WARNING_A_MAIN,
  },
  green: {
    backgroundColor: Colors.PALETTE_07_SUCCESS_A_MAIN,
  },
  cursor: {position: 'absolute', top: 0, left: '46%', ...Alignments.center},
  frieze: {
    ...Alignments.rowCenter,
    height: 80,
    flex: 1,
  },
  indicatorValue: {
    lineHeight: 14,
    ...Fonts.textBlack,
  },
  indicatorCtnr: {flex: 1, height: 17},
  scaleValue: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  flex2: {flex: 2},
  emptyCtnr: {height: 80, ...Alignments.center},
  empty: {
    fontSize: 10,
    ...Fonts.light,
    ...Alignments.textCenter,
  },
});
