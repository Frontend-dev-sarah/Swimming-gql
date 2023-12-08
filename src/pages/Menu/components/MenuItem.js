import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import I18n from 'i18n-js';
import RoutesNames from '../../../navigation/RoutesNames';
import Alignments from '../../../theme/Alignments';
import Colors from '../../../theme/Colors';
import i18n from '../../../utils/localization/I18n';
import AppImage from '../../../utils/AppImage';

export default function MenuItem({item, white, stats}) {
  const navigation = useNavigation();

  function getIcon() {
    switch (item) {
      case 'waterTemperature':
        return 'thermometer';
      case 'waterQuality':
        return <Image source={AppImage.waterIcon} style={styles.iconImg} />;
      case 'filtration':
        return 'filter-variant';
      case 'projector':
        return 'lightbulb-outline';
      case 'videoSurveillance':
        return 'eye';
      case 'priorityMode':
        return 'exclamation';
      case 'advices':
        return 'help-circle-outline';
      case 'statistics':
        return (
          <MaterialIcons
            name={'bar-chart'}
            size={16}
            style={styles.icon}
            color={
              white
                ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
                : Colors.white
            }
          />
        );
      case 'myDealer':
        return 'home';
      case 'appParams':
        return 'cog';
      case 'poolParams':
        return (
          <MaterialIcons
            name={'pool'}
            size={16}
            style={styles.icon}
            color={
              white
                ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
                : Colors.white
            }
          />
        );
      case 'cumulativeStats':
        return 'view-dashboard-variant';
      case 'heatPump':
        return 'fire';
      case 'electrolyser':
        return 'battery-charging';
      case 'ph':
        return (
          <MaterialIcons
            name={'insert-chart-outlined'}
            size={16}
            style={styles.icon}
            color={
              white
                ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
                : Colors.white
            }
          />
        );
      case 'dirtyingRate':
        return (
          <MaterialIcons
            name={'insert-chart-outlined'}
            size={16}
            style={styles.icon}
            color={
              white
                ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
                : Colors.white
            }
          />
        );
      case 'waterLevel':
        return (
          <MaterialIcons
            name={'waves'}
            size={16}
            style={styles.icon}
            color={
              white
                ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
                : Colors.white
            }
          />
        );
      case 'chloreRate':
        return (
          <MaterialIcons
            name={'insert-chart-outlined'}
            size={16}
            style={styles.icon}
            color={
              white
                ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
                : Colors.white
            }
          />
        );
      default:
        return 'cog';
    }
  }

  function getNavigationRoute() {
    switch (item) {
      case 'waterTemperature':
        return RoutesNames.WaterTemperaturePage;
      case 'waterQuality':
        return RoutesNames.WaterQualityPage;
      case 'filtration':
        return stats
          ? RoutesNames.FiltrationStatPage
          : RoutesNames.FiltrationPage;
      case 'projector':
        return RoutesNames.ProjectorsPage;
      case 'videoSurveillance':
        return RoutesNames.CameraPage;
      case 'priorityMode':
        return RoutesNames.PriorityModePage;
      case 'advices':
        return;
      case 'statistics':
        return RoutesNames.StatsMenuPage;
      case 'myDealer':
        return RoutesNames.DealerPage;
      case 'appParams':
        return RoutesNames.AppParamsPage;
      case 'poolParams':
        return RoutesNames.PoolParamsPage;
      case 'cumulativeStats':
        return RoutesNames.CumulativeStatsPage;
      case 'heatPump':
        return;
      case 'electrolyser':
        return;
      case 'chloreRate':
        return;
      case 'ph':
        return;
      case 'dirtyingRate':
        return;
      case 'waterLevel':
        return;
    }
  }

  function onPressItem() {
    const route = getNavigationRoute();
    route && navigation.navigate(route);
  }

  return (
    <List.Item
      onPress={onPressItem}
      title={i18n.t('menu.items')[item]}
      left={() =>
        typeof getIcon() !== 'string' ? (
          getIcon()
        ) : (
          <MaterialCommunityIcons
            name={getIcon()}
            size={16}
            style={[styles.icon]}
            color={
              white
                ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
                : Colors.white
            }
          />
        )
      }
      right={() => (
        <List.Icon
          color={
            white
              ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
              : Colors.white
          }
          icon="chevron-right"
        />
      )}
      theme={{
        colors: {
          text: white
            ? Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY
            : Colors.white,
        },
      }}
      style={white ? styles.white : styles.blue}
    />
  );
}

const styles = StyleSheet.create({
  icon: {...Alignments.selfCenter, marginLeft: 20, marginRight: 10},
  iconImg: {
    height: 16,
    width: 16,
    ...Alignments.selfCenter,
    marginLeft: 20,
    marginRight: 10,
  },
  white: {
    backgroundColor: 'white',
    elevation: 2,
    marginVertical: 4,
    marginHorizontal: 30,
    borderRadius: 7,
    paddingHorizontal: 0,
    height: 49,
    ...Alignments.center,
  },
  blue: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.ACTION_E_FOCUS,
    height: 52,
    ...Alignments.center,
    paddingHorizontal: 0,
    marginHorizontal: 15,
  },
});
