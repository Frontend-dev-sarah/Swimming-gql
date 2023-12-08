import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ManagementContext from '../../contexts/ManagementContext';
import Alignments from '../../theme/Alignments';

import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {displayDayFromNow} from '../../utils/TimeService';

export default function NotificationCard({
  notif,
  type,
  onPress,
  onPressOption,
}) {
  const {NOTIFICATION_TYPE} = useContext(ManagementContext);

  function customCardStyle() {
    switch (type) {
      case NOTIFICATION_TYPE.failure:
        return styles.failureCard;
      case NOTIFICATION_TYPE.advice:
        return styles.adviceCard;
      case NOTIFICATION_TYPE.alert:
        return styles.alertCard;
    }
  }

  function cardIconProps() {
    switch (type) {
      case NOTIFICATION_TYPE.failure:
        return {name: 'alert-outline', color: Colors.white};
      case NOTIFICATION_TYPE.advice:
        return {name: 'information-outline', color: Colors.PRIMARY_C_LIGHT};
      case NOTIFICATION_TYPE.alert:
        return {name: 'alert-outline', color: Colors.WARNING_A_MAIN};
    }
  }
  function getTextStyle() {
    switch (type) {
      case NOTIFICATION_TYPE.failure:
        return Fonts.text;
      case NOTIFICATION_TYPE.advice:
        return styles.textAdvice;
      case NOTIFICATION_TYPE.alert:
        return styles.textAlert;
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Card style={[styles.container, customCardStyle()]} onPress={onPress}>
        <View style={Alignments.row}>
          <MaterialCommunityIcons
            {...cardIconProps()}
            size={24}
            style={styles.icon}
          />
          <View style={Alignments.fill}>
            <Text style={[getTextStyle()]}>La filtration est en panne</Text>
            {/* <Text style={[getTextStyle(), styles.textBody]}>
              L’arret prolongé de la filtration peut rapidement endommager votre
              piscine. Contactez votre concessionnaire !
            </Text> */}
            <View style={styles.bottom}>
              <Text style={[getTextStyle(), Fonts.light]}>
                {displayDayFromNow(notif.date)}
              </Text>
              <Text style={[getTextStyle()]}>Contacter</Text>
            </View>
          </View>
        </View>
      </Card>
      {onPressOption ? (
        <IconButton
          icon="dots-horizontal"
          color={Colors.black}
          size={24}
          onPress={onPressOption}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 4,
    ...Alignments.rowCenter,
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    flex: 1,
  },
  failureCard: {backgroundColor: Colors.ERROR},
  adviceCard: {borderWidth: 1, borderColor: Colors.INFO_A_MAIN},
  alertCard: {backgroundColor: Colors.WARNING_C_LIGHT},
  icon: {marginRight: 20},
  textAlert: {
    color: Colors.WARNING_B_DARK,
  },
  textAdvice: {
    color: Colors.INFO_D_ALERT_TEXT,
  },
  bottom: {marginTop: 9, ...Alignments.rowBetween},
  textBody: {
    marginTop: 7,
    ...Fonts.light,
    ...Fonts.little,
    marginRight: '5%',
  },
});
