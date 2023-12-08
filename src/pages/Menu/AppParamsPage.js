import React, {useContext, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import * as Yup from 'yup';

import Alignments from '../../theme/Alignments';
import i18n from '../../utils/localization/I18n';
import LanguagePicker from '../../components/DropDownPicker/LanguagePicker';
import {Card, Divider, Text} from 'react-native-paper';
import Fonts from '../../theme/Fonts';
import CustomButton from '../../components//Button/CustomButton';
import SwitchTextButton from '../../components/Switch/SwitchTextButton';
import ManagementContext from '../../contexts/ManagementContext';
import Form from '../../components/formik/Form';
import SwitchFieldForm from '../../components/formik/SwitchFieldForm';
import {useMutation} from '@apollo/client';
import ManagementApi from '../../api/GQL/ManagementApi';
import {errorAlert} from '../../utils/Alert/errorAlert';
import SwitchFieldIcon from '../../components/Switch/SwitchFieldIcon';
import RoutesNames from '../../navigation/RoutesNames';

export default function AppParamsPage({navigation}) {
  const {users, getManagementInfos} = useContext(ManagementContext);
  const [tempUnit, setTempUnit] = useState(i18n.t('params.celsius'));

  // validation schemas
  const pushSchema = Yup.object().shape({
    pushadviceStatus: Yup.boolean(),
    pushalertStatus: Yup.boolean(),
    pushfailureStatus: Yup.boolean(),
  });

  const smsSchema = Yup.object().shape({
    smsadviceStatus: Yup.boolean(),
    smsalertStatus: Yup.boolean(),
    smsfailureStatus: Yup.boolean(),
  });

  const mailSchema = Yup.object().shape({
    mailadviceStatus: Yup.boolean(),
    mailalertStatus: Yup.boolean(),
    mailfailureStatus: Yup.boolean(),
  });

  // initialValues
  const initialValuesNotifsPush = {
    // todo changer et prendre les infos du vrai user connecté
    pushfailureStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.pushfailureStatus) ||
      false,
    pushalertStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.pushalertStatus) ||
      false,
    pushadviceStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.pushadviceStatus) ||
      false,
  };

  const initialValuesNotifsSms = {
    smsfailureStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.smsfailureStatus) ||
      false,
    smsalertStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.smsalertStatus) ||
      false,
    smsadviceStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.smsadviceStatus) ||
      false,
  };

  const initialValuesNotifsMail = {
    mailfailureStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.mailfailureStatus) ||
      false,
    mailalertStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.mailalertStatus) ||
      false,
    mailadviceStatus:
      (users &&
        users.length &&
        users[0]?.notificationParameters?.mailadviceStatus) ||
      false,
  };

  // gql
  const [updateUserNotificationsPushParameters] = useMutation(
    ManagementApi.updateUserNotificationsPushParameters,
    {
      onCompleted({updateUserNotificationsPushParameters: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    },
  );

  const [updateUserNotificationsSMSParameters] = useMutation(
    ManagementApi.updateUserNotificationsSMSParameters,
    {
      onCompleted({updateUserNotificationsSMSParameters: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    },
  );

  const [updateUserNotificationsEmailParameters] = useMutation(
    ManagementApi.updateUserNotificationsEmailParameters,
    {
      onCompleted({updateUserNotificationsEmailParameters: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    },
  );

  function isPushActivate() {
    return (
      users &&
      users.length &&
      (users[0]?.notificationParameters?.pushfailureStatus ||
        users[0]?.notificationParameters?.pushalertStatus ||
        users[0]?.notificationParameters?.pushadviceStatus)
    );
  }
  function isSmsActivate() {
    return (
      users &&
      users.length &&
      (users[0]?.notificationParameters?.smsfailureStatus ||
        users[0]?.notificationParameters?.smsalertStatus ||
        users[0]?.notificationParameters?.smsadviceStatus)
    );
  }
  function isMailActivate() {
    return (
      users &&
      users.length &&
      (users[0]?.notificationParameters?.mailfailureStatus ||
        users[0]?.notificationParameters?.mailalertStatus ||
        users[0]?.notificationParameters?.mailadviceStatus)
    );
  }

  return (
    <ScrollView
      style={[Alignments.fill]}
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>{i18n.t('params.language')}</Text>
      <LanguagePicker />
      <Text style={styles.title}>{i18n.t('params.temperatureUnit')}</Text>
      <SwitchTextButton
        value1={i18n.t('params.celsius')}
        value2={i18n.t('params.farenheit')}
        selectedValue={tempUnit}
        changeValue={setTempUnit}
      />
      <Card style={styles.notifsCard}>
        <Text style={[Fonts.medium, styles.hMargin]}>
          {i18n.t('params.notifManagement')}
        </Text>
        <CustomButton
          text={i18n.t('params.deactivateAll')}
          onPress={() => null} // TODO implement
          textMode
          customStyle={[styles.textBtn]}
        />
        <Form
          onSubmit={variables =>
            updateUserNotificationsPushParameters({
              variables: {
                userId: users && users.length && users[0]?.id, // todo replace by good user id
                advice: variables.pushadviceStatus,
                alert: variables.pushalertStatus,
                failure: variables.pushfailureStatus,
              },
            })
          }
          initialValues={initialValuesNotifsPush}
          schema={pushSchema}
          style={styles.form}>
          <>
            <SwitchFieldIcon
              icon="bell-outline"
              isSwitchOn={isPushActivate()}
              label={i18n.t('params.pushNotif')}
              onToggleSwitch={val =>
                updateUserNotificationsPushParameters({
                  variables: {
                    userId: users && users.length && users[0]?.id, // todo replace by good user id
                    advice: val,
                    alert: val,
                    failure: val,
                  },
                })
              }
              style={styles.switchTitle}
            />
            <SwitchFieldForm
              name="pushfailureStatus"
              label={i18n.t('params.failureAlert')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="pushalertStatus"
              label={i18n.t('params.alertAlert')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="pushadviceStatus"
              label={i18n.t('params.adviceAlert')}
              style={styles.switchField}
            />
          </>
        </Form>
        <Divider style={styles.divider} />
        <Form
          onSubmit={variables =>
            updateUserNotificationsSMSParameters({
              variables: {
                userId: users && users.length && users[0]?.id, // todo replace by good user id
                advice: variables.smsadviceStatus,
                alert: variables.smsalertStatus,
                failure: variables.smsfailureStatus,
              },
            })
          }
          initialValues={initialValuesNotifsSms}
          schema={smsSchema}
          style={styles.form}>
          <>
            <SwitchFieldIcon
              icon="cellphone-android"
              isSwitchOn={isSmsActivate()}
              label={i18n.t('params.smsNotif')}
              onToggleSwitch={val =>
                updateUserNotificationsSMSParameters({
                  variables: {
                    userId: users && users.length && users[0]?.id, // todo replace by good user id
                    advice: val,
                    alert: val,
                    failure: val,
                  },
                })
              }
              style={styles.switchTitle}
            />
            <SwitchFieldForm
              name="smsfailureStatus"
              label={i18n.t('params.failureAlert')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="smsalertStatus"
              label={i18n.t('params.alertAlert')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="smsadviceStatus"
              label={i18n.t('params.adviceAlert')}
              style={styles.switchField}
            />
          </>
        </Form>
        <Divider style={styles.divider} />
        <Form
          onSubmit={variables =>
            updateUserNotificationsEmailParameters({
              variables: {
                userId: users && users.length && users[0]?.id, // todo replace by good user id
                advice: variables.mailadviceStatus,
                alert: variables.mailalertStatus,
                failure: variables.mailfailureStatus,
              },
            })
          }
          initialValues={initialValuesNotifsMail}
          schema={mailSchema}
          style={styles.form}>
          <>
            <SwitchFieldIcon
              icon="email-outline"
              isSwitchOn={isMailActivate()}
              label={i18n.t('params.mailNotif')}
              onToggleSwitch={val =>
                updateUserNotificationsEmailParameters({
                  variables: {
                    userId: users && users.length && users[0]?.id, // todo replace by good user id
                    advice: val,
                    alert: val,
                    failure: val,
                  },
                })
              }
              style={styles.switchTitle}
            />
            <SwitchFieldForm
              name="mailfailureStatus"
              label={i18n.t('params.failureAlert')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="mailalertStatus"
              label={i18n.t('params.alertAlert')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="mailadviceStatus"
              label={i18n.t('params.adviceAlert')}
              style={styles.switchField}
            />
          </>
        </Form>
      </Card>
      <CustomButton
        text={i18n.t('params.editUserInfos')}
        onPress={() => navigation.navigate(RoutesNames.Profile)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 21,
    paddingBottom: 25,
    minHeight: '100%',
  },
  title: {
    ...Fonts.medium,
    marginHorizontal: 31,
    marginBottom: 18,
  },
  notifsCard: {
    marginVertical: 24,
    paddingVertical: 16,
  },
  textBtn: {
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  switchField: {
    marginVertical: 10,
  },
  hMargin: {marginHorizontal: 25},
  divider: {
    marginHorizontal: 31,
    marginTop: 7,
    marginBottom: 23,
    height: 1,
  },
  switchTitle: {
    marginBottom: 13,
  },
});
