import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import I18n from 'i18n-js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Alignments from '../../theme/Alignments';
import AppStyle from '../../theme/AppStyle';
import Colors from '../../theme/Colors';
import {IconButton, Text} from 'react-native-paper';
import Fonts from '../../theme/Fonts';
import CustomShip from '../../components/Chip/CustomShip';
import NotificationCard from '../../components/Cards/NotificationCard';
import ManagementContext from '../../contexts/ManagementContext';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import NotificationBottomSheetContent from '../../components/BottomSheet/NotificationBottomSheetContent';

export default function NotificationsPage() {
  const {notifications, NOTIFICATION_TYPE} = useContext(ManagementContext);
  const [selectedFilter, setSelectedFilter] = useState('seeAll');
  const [notifPressed, setNotifPressed] = useState(null);

  function renderFilters() {
    return (
      <ScrollView
        horizontal
        style={styles.filtersCtnr2}
        contentContainerStyle={styles.filtersCtnr}
        showsHorizontalScrollIndicator={false}>
        {Object.keys(NOTIFICATION_TYPE).map(item => (
          <CustomShip
            key={item}
            text={NOTIFICATION_TYPE[item]}
            isSelected={selectedFilter === item}
            onPress={() => setSelectedFilter(item)}
          />
        ))}
      </ScrollView>
    );
  }

  function getNotifsListByFilter() {
    if (selectedFilter === Object.keys(NOTIFICATION_TYPE)[0]) {
      return notifications?.failureNotifications
        ?.concat(notifications?.alertNotifications)
        ?.concat(notifications?.adviceNotifications)
        .sort(function (a, b) {
          return new Date(a.date).getTime() - new Date(b.date).getTime(); // sort by date
        });
    } else if (selectedFilter === Object.keys(NOTIFICATION_TYPE)[1]) {
      return notifications?.failureNotifications;
    } else if (selectedFilter === Object.keys(NOTIFICATION_TYPE)[2]) {
      return notifications?.alertNotifications;
    } else if (selectedFilter === Object.keys(NOTIFICATION_TYPE)[3]) {
      return notifications?.adviceNotifications;
    } else {
      return [];
    }
  }

  function getNotifType(notif) {
    if (
      notifications?.failureNotifications.find(item => item.id === notif?.id)
    ) {
      return NOTIFICATION_TYPE.failure;
    } else if (
      notifications?.alertNotifications.find(item => item.id === notif?.id)
    ) {
      return NOTIFICATION_TYPE.alert;
    } else if (
      notifications?.adviceNotifications.find(item => item.id === notif?.id)
    ) {
      return NOTIFICATION_TYPE.advice;
    }
  }

  function renderPrioHeader() {
    return notifications?.failureNotifications?.length ? (
      <>
        <Text style={styles.flatTitle}>{I18n.t('notifications.prio')}</Text>
        {notifications?.failureNotifications?.map(item => (
          <NotificationCard
            key={item.id + 'prio'}
            notif={item}
            type={NOTIFICATION_TYPE.failure}
            onPress={() => console.log('todo')}
            onPressOption={
              getNotifType(item) !== NOTIFICATION_TYPE.failure
                ? () => setNotifPressed(item)
                : null
            }
          />
        ))}
      </>
    ) : null;
  }

  return (
    <>
      <View style={[styles.container, AppStyle.safeContainer]}>
        <View style={Alignments.rowBetween}>
          <View style={Alignments.rowCenter}>
            <MaterialCommunityIcons
              name="bell-outline"
              color={Colors.PRIMARY}
              size={24}
            />
            <Text style={styles.title}>{I18n.t('notifications.title')}</Text>
          </View>
          <IconButton
            icon="cog"
            color={Colors.PRIMARY}
            size={24}
            onPress={() => null}
          />
        </View>
        {renderFilters()}
        <FlatList
          data={getNotifsListByFilter()}
          renderItem={({item}) => (
            <NotificationCard
              notif={item}
              type={getNotifType(item)}
              onPress={() => console.log('todo')}
              onPressOption={
                getNotifType(item) !== NOTIFICATION_TYPE.failure
                  ? () => setNotifPressed(item)
                  : null
              }
            />
          )}
          contentContainerStyle={styles.flatlist}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => (
            <>
              {renderPrioHeader()}
              {getNotifsListByFilter()?.length ? (
                <Text style={styles.flatTitle}>
                  {I18n.t('notifications.earlier')}
                </Text>
              ) : null}
            </>
          )}
          ListEmptyComponent={() => (
            <Text style={Alignments.selfCenter}>
              {I18n.t('notifications.noNotifs')}
            </Text>
          )}
          removeClippedSubviews={false}
          extraData={selectedFilter}
        />
      </View>
      <CustomBottomSheet
        setVisible={setNotifPressed}
        visible={notifPressed}
        children={() => (
          <NotificationBottomSheetContent
            notif={notifPressed}
            type={notifPressed && getNotifType(notifPressed)}
            closeBottomSheet={() => setNotifPressed(null)}
          />
        )}
        customHeight="30%"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 31,
    height: '100%',
  },
  title: {marginLeft: 8, ...Fonts.light, fontSize: 20, ...Fonts.title},
  filtersCtnr: {
    paddingLeft: 31,
    minHeight: 30,
  },
  filtersCtnr2: {
    marginHorizontal: -31,
    marginBottom: 10,
    marginTop: 31,
    flexGrow: 0,
  },
  flatlist: {
    paddingBottom: 15,
  },
  flatTitle: {
    ...Fonts.medium,
    marginBottom: 6,
    marginTop: 2,
  },
});
