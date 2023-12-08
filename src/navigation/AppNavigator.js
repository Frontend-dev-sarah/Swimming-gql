import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from 'i18n-js';
import RoutesNames from './RoutesNames';
import Colors from '../theme/Colors';
import AppStyle, {headerStyle} from '../theme/AppStyle';
import MyPoolPage from '../pages/MyPool/MyPoolPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import NotificationsPage from '../pages/Notifications/NotificationsPage';
import MenuPage from '../pages/Menu/MenuPage';
import WaterTemperaturePage from '../pages/MyPool/WaterTemperaturePage';
import {Text} from 'react-native-paper';
import {Image, StatusBar, View} from 'react-native';
import Alignments from '../theme/Alignments';
import Fonts from '../theme/Fonts';
import FiltrationPage from '../pages/MyPool/FiltrationPage';
import CumulativeStatsPage from '../pages/Stats/CumulativeStatsPage';
import StatsMenuPage from '../pages/Stats/StatsMenuPage';
import WaterQualityPage from '../pages/MyPool/WaterQualityPage';
import AppImage from '../utils/AppImage';
import FiltrationStatPage from '../pages/Stats/FiltrationStatPage';
import ProjectorsPage from '../pages/MyPool/ProjectorsPage';
import CameraPage from '../pages/MyPool/CameraPage';
import ManagementContext from '../contexts/ManagementContext';
import AppParamsPage from '../pages/Menu/AppParamsPage';
import PriorityModePage from '../pages/Menu/PriorityModePage';
import PoolParamsPage from '../pages/Menu/PoolParamsPage';
import ConnectionsHistoryPage from '../pages/Profile/ConnectionsHistoryPage';
import EditPasswordPage from '../pages/Profile/EditPasswordPage';
import AddProfilePage from '../pages/Profile/AddProfilePage';
import DealerPage from '../pages/Menu/DealerPage';
import OtherProfilePage from '../pages/Profile/OtherProfilePage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTab() {
  const {notifications} = useContext(ManagementContext);

  return (
    <Tab.Navigator
      safeAreaInsets={{bottom: 0}}
      initialRouteName={RoutesNames.MyPool}
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.PRIMARY,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.LIGHTTEXT,
        tabBarItemStyle: {paddingBottom: 10 + getBottomSpace()},
        tabBarStyle: {
          height: 50 + getBottomSpace(),
          borderColor: Colors.transparent,
        },
        tabBarLabelStyle: {
          ...Fonts.bold,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={RoutesNames.MyPool}
        component={MyPoolPage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="pool" color={color} size={22} />
          ),
          tabBarLabel: I18n.t('pages.myPool'),
        }}
      />
      <Tab.Screen
        name={RoutesNames.Profile}
        component={ProfilePage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={22}
            />
          ),
          tabBarLabel: I18n.t('pages.profile'),
        }}
      />
      <Tab.Screen
        name={RoutesNames.Notifications}
        component={NotificationsPage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={22}
            />
          ),
          tabBarLabel: I18n.t('pages.notifications'),
          tabBarBadge:
            notifications?.failureNotifications
              ?.concat(notifications?.alertNotifications)
              ?.concat(notifications?.adviceNotifications)?.length || null, // todo afficher seulement pour les non lues max 99
        }}
      />
      <Tab.Screen
        name={RoutesNames.Menu}
        component={MenuPage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="menu" color={color} size={22} />
          ),
          tabBarLabel: I18n.t('pages.menu'),
        }}
      />
    </Tab.Navigator>
  );
}

function renderIconTitle({iconName, routeName, icon}) {
  return (
    <View style={Alignments.rowCenter}>
      {iconName ? (
        <MaterialCommunityIcons
          name={iconName}
          color={Colors.white}
          size={24}
        />
      ) : (
        icon
      )}
      <Text style={AppStyle.headerTitle}>{routeName}</Text>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenListeners={{
        state: e => {
          // update statusbar text color when we navigate on pages with header
          if (e?.data?.state && e.data.state.index !== (null || undefined)) {
            StatusBar.setBarStyle(
              e.data.state.index === 0 ? 'dark-content' : 'light-content',
            );
          }
        },
      }}>
      <Stack.Screen
        name={RoutesNames.BottomTab}
        component={BottomTab}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={RoutesNames.WaterTemperaturePage}
        component={WaterTemperaturePage}
        options={({route}) => ({
          ...headerStyle,
          headerTitle: () =>
            renderIconTitle({
              routeName: I18n.t('pages.waterTemperaturePage'),
              iconName: 'thermometer',
            }),
        })}
      />
      <Stack.Screen
        name={RoutesNames.FiltrationStatPage}
        component={FiltrationStatPage}
        options={() => ({
          ...headerStyle,
          headerTitle: () =>
            renderIconTitle({
              routeName: I18n.t('pages.filtrationStatPage'),
            }),
        })}
      />
      <Stack.Screen
        name={RoutesNames.CumulativeStatsPage}
        component={CumulativeStatsPage}
        options={() => ({
          ...headerStyle,
        })}
      />
      <Stack.Screen
        name={RoutesNames.StatsMenuPage}
        component={StatsMenuPage}
        options={({route}) => ({
          ...headerStyle,
          headerTitle: () =>
            renderIconTitle({
              routeName: I18n.t('pages.statsMenuPage'),
              icon: (
                <MaterialIcons
                  name={'bar-chart'}
                  size={24}
                  color={Colors.white}
                />
              ),
            }),
        })}
      />
      <Stack.Screen
        name={RoutesNames.WaterQualityPage}
        component={WaterQualityPage}
        options={({route}) => ({
          ...headerStyle,
          headerTitle: () =>
            renderIconTitle({
              routeName: I18n.t('pages.WaterQualityPage'),
              icon: (
                <Image
                  source={AppImage.waterIcon}
                  style={AppStyle.headerImage}
                  resizeMode="contain"
                />
              ),
            }),
        })}
      />
      <Stack.Screen
        name={RoutesNames.FiltrationPage}
        component={FiltrationPage}
        options={({route}) => ({
          ...headerStyle,
          headerTitle: () =>
            renderIconTitle({
              routeName: I18n.t('pages.filtrationPage'),
              iconName: 'filter-variant',
            }),
        })}
      />
      <Stack.Screen
        name={RoutesNames.ProjectorsPage}
        component={ProjectorsPage}
        options={() => ({
          ...headerStyle,
          headerTitle: () =>
            renderIconTitle({
              routeName: I18n.t('pages.ProjectorsPage'),
              iconName: 'lightbulb-outline',
            }),
        })}
      />
      <Stack.Screen
        name={RoutesNames.CameraPage}
        component={CameraPage}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={RoutesNames.AppParamsPage}
        component={AppParamsPage}
        options={() => ({
          ...headerStyle,
          headerTitle: I18n.t('pages.AppParamsPage'),
        })}
      />
      <Stack.Screen
        name={RoutesNames.PriorityModePage}
        component={PriorityModePage}
        options={() => ({
          ...headerStyle,
          headerTitle: I18n.t('pages.PriorityModePage'),
        })}
      />
      <Stack.Screen
        name={RoutesNames.PoolParamsPage}
        component={PoolParamsPage}
        options={() => ({
          ...headerStyle,
          headerTitle: I18n.t('pages.PoolParamsPage'),
        })}
      />
      <Stack.Screen
        name={RoutesNames.ConnectionsHistoryPage}
        component={ConnectionsHistoryPage}
        options={() => ({
          ...headerStyle,
          headerTitle: I18n.t('pages.ConnectionsHistoryPage'),
        })}
      />
      <Stack.Screen
        name={RoutesNames.EditPasswordPage}
        component={EditPasswordPage}
        options={() => ({
          ...headerStyle,
          headerTitle: I18n.t('pages.EditPasswordPage'),
        })}
      />
      <Stack.Screen
        name={RoutesNames.AddProfilePage}
        component={AddProfilePage}
        options={() => ({
          ...headerStyle,
          headerTitle: I18n.t('pages.AddProfilePage'),
        })}
      />
      <Stack.Screen
        name={RoutesNames.DealerPage}
        component={DealerPage}
        options={() => ({
          ...headerStyle,
          headerTitle: I18n.t('pages.DealerPage'),
        })}
      />
      <Stack.Screen
        name={RoutesNames.OtherProfilePage}
        component={OtherProfilePage}
        options={() => ({
          ...headerStyle,
          headerTitle: '',
        })}
      />
      {/* add other screens here */}
    </Stack.Navigator>
  );
}
