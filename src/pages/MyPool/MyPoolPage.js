import React, {useContext} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Text} from 'react-native-paper';
import FiltrationDial from '../../components/Charts/FiltrationDial';
import WaterQualityIndicator from '../../components/Charts/WaterQualityIndicator';

import RunningStateIndicatorCard from '../../components/RunningState/RunningStateIndicatorCard';
import CameraWidget from '../../components/Widgets/CameraWidget';
import FilterCleanWidget from '../../components/Widgets/FilterCleanWidget';
import ProjectorWidget from '../../components/Widgets/ProjectorWidget';
import WaterLevelWidget from '../../components/Widgets/WaterLevelWidget';
import ManagementContext from '../../contexts/ManagementContext';
import RoutesNames from '../../navigation/RoutesNames';
import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import AppImage from '../../utils/AppImage';
import {screenWidth} from '../../utils/constants';
import i18n from '../../utils/localization/I18n';

export default function MyPoolPage({navigation}) {
  const {weather, water, devices} = useContext(ManagementContext);

  return (
    <>
      <ScrollView
        style={[Alignments.fill]}
        contentContainerStyle={[styles.container]}>
        <View style={styles.blue}>
          <Image
            source={AppImage.logo}
            style={[styles.logo]}
            resizeMode="contain"
          />
          <Text style={[styles.outsideTemp]}>
            {i18n.t('myPool.outsideTemp')}
          </Text>
          <Text style={[styles.outsideDegrees]}>{`${
            weather?.temp || '-'
          }${i18n.t('myPool.celsius')}`}</Text>
        </View>
        <ImageBackground source={AppImage.wave} style={[styles.wave]}>
          <Image
            source={AppImage.swimer}
            style={[styles.swimer]}
            resizeMode="contain"
          />
          <Text style={[styles.outsideTemp, Fonts.textBlack]}>
            {i18n.t('myPool.myPool')}
          </Text>
          <View style={[Alignments.rowCenter, Alignments.selfStretch]}>
            {/* TODO change to celsius */}
            <Text style={[styles.outsideDegrees, Fonts.textBlack]}>{`${
              water?.temp?.actualTemp || '-'
            }${i18n.t('myPool.celsius')}`}</Text>
            {devices?.heatPump ? (
              <Text style={[styles.target, Fonts.textBlack]}>{`${i18n.t(
                'myPool.target',
              )} : ${water?.temp?.targetTemp || '-'}${i18n.t(
                'myPool.celsius',
              )}`}</Text>
            ) : null}
          </View>
        </ImageBackground>
        <RunningStateIndicatorCard
          item={i18n.t('myPool.heatPump')}
          running={water?.temp?.heatPumpStatus}
          onPress={() => navigation.navigate(RoutesNames.WaterTemperaturePage)}
          customStyle={styles.runningStateCard}
        />
        <WaterQualityIndicator />
        <FiltrationDial
          freeProgram={water?.filtration?.mode === 'custom'}
          title={i18n.t('filtration.filtration')}
          titleIcon="filter-variant"
          onPressCard={() => navigation.navigate(RoutesNames.FiltrationPage)}
          hoursSlots={water?.filtration?.calendar}
        />
        <View style={styles.widgetCtnr}>
          <WaterLevelWidget />
          <FilterCleanWidget />
          <ProjectorWidget />
          <CameraWidget />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {paddingBottom: 23},
  blue: {
    backgroundColor: Colors.PRIMARY,
    width: screenWidth,
    ...Alignments.colCross,
  },
  wave: {
    marginTop: '-30%',
    width: screenWidth,
    ...Alignments.colCross,
    paddingTop: 10,
    paddingBottom: 50,
  },
  logo: {
    width: '25%',
    marginTop: getStatusBarHeight() + 10,
    maxHeight: 60,
  },
  outsideTemp: {
    marginTop: 17,
    ...Fonts.fontAndra,
    fontSize: 20,
    color: Colors.TEXT_B_LIGHT_B_MEDIUM_EMPHASIS,
    letterSpacing: 0,
  },
  swimer: {
    width: '30%',
    position: 'absolute',
    top: '-120%',
    left: 0,
  },
  outsideDegrees: {
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: 0,
    ...Fonts.text,
    ...Fonts.light,
  },
  target: {
    ...Fonts.little,
    position: 'absolute',
    right: 56,
    color: Colors.TEXT_A_DARK_B_MEDIUM_EMPHASIS_TEXT_SECONDARY,
    ...Fonts.light,
  },

  widgetCtnr: {
    flexWrap: 'wrap',
    marginTop: 8,
    marginHorizontal: 31,
    ...Alignments.rowBetween,
  },
  runningStateCard: {marginTop: -30},
});
