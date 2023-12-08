import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'i18n-js';
import {useMutation} from '@apollo/client';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {screenWidth} from '../../utils/constants';
import ManagementApi from '../../api/GQL/ManagementApi';
import ManagementContext from '../../contexts/ManagementContext';
import {errorAlert} from '../../utils/Alert/errorAlert';
import CustomButton from '../Button/CustomButton';

export default function NotificationBottomSheetContent({
  notif,
  type,
  closeBottomSheet,
}) {
  const {getManagementInfos, NOTIFICATION_TYPE} = useContext(ManagementContext);
  function iconName() {
    switch (type) {
      case NOTIFICATION_TYPE.failure:
        return 'alert-outline';
      case NOTIFICATION_TYPE.advice:
        return 'information-outline';
      case NOTIFICATION_TYPE.alert:
        return 'alert-outline';
    }
  }

  //gql
  const [deleteNotification, {loading: deleteNotificationLoading}] =
    useMutation(ManagementApi.deleteNotification, {
      onCompleted({deleteNotification: returnValue}) {
        if (returnValue) {
          getManagementInfos();
          closeBottomSheet();
        }
      },
      onError() {
        return errorAlert();
      },
    });

  console.log(
    Object.keys(NOTIFICATION_TYPE).find(key => NOTIFICATION_TYPE[key] === type),
    notif,
  );
  function renderOptionItem() {
    return (
      <CustomButton
        text={I18n.t('notifications.deleteNotif')}
        icon="delete"
        textMode
        customStyle={styles.item}
        onPress={() =>
          type &&
          notif?.id &&
          deleteNotification({
            variables: {
              id: notif.id,
              type: Object.keys(NOTIFICATION_TYPE).find(
                key => NOTIFICATION_TYPE[key] === type,
              ),
            },
          })
        }
        theme={{
          fonts: {
            medium: {
              color: Colors.PRIMARY,
              fontFamily: 'Lexend-Light',
              fontWeight: '400',
              fontSize: 14,
              lineHeight: 15,
              letterSpacing: 0.15,
              ...Fonts.uppercase,
            },
          },
        }}
        loading={deleteNotificationLoading}
      />
    );
  }

  return (
    <View>
      <View style={styles.titleCtnr}>
        <MaterialCommunityIcons
          name={iconName()}
          size={24}
          color={Colors.PRIMARY}
        />
        <Text style={styles.title}>
          Un problème de pH ? Suivez nos conseils
        </Text>
      </View>
      <Divider style={styles.divider} />
      {renderOptionItem()}
    </View>
  );
}

const styles = StyleSheet.create({
  titleCtnr: {...Alignments.rowCross},
  title: {marginLeft: 15, fontSize: 24, ...Fonts.light},
  divider: {
    width: screenWidth,
    marginLeft: -30,
    height: 1,
    marginVertical: 20,
  },
  text: {
    ...Fonts.light,
    ...Fonts.title,
    marginLeft: 10,
    ...Fonts.uppercase,
  },
  item: {
    ...Alignments.rowCross,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    marginHorizontal: -20,
  },
});
