import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import I18n from 'i18n-js';
import * as Yup from 'yup';
import {Divider, Text} from 'react-native-paper';

import AppStyle from '../../theme/AppStyle';
import CustomButton from '../../components/Button/CustomButton';
import FormView from '../../components/formik/FormView';
import Form from '../../components/formik/Form';
import TextField from '../../components/formik/TextField';
import Fonts from '../../theme/Fonts';
import {useMutation} from '@apollo/client';
import ManagementApi from '../../api/GQL/ManagementApi';
import {errorAlert} from '../../utils/Alert/errorAlert';
import ManagementContext from '../../contexts/ManagementContext';
import SwitchFieldForm from '../../components/formik/SwitchFieldForm';
import RoutesNames from '../../navigation/RoutesNames';

const phoneRegExp = /^(33|0)(1|2|3|4|5|6|7|9)\d{8}$/;

const schema = Yup.object().shape({
  firstname: Yup.string().required(I18n.t('error.notBlankFirstname')),
  lastname: Yup.string().required(I18n.t('error.notBlankLastname')),
  mail: Yup.string()
    .email(I18n.t('error.notValidEmail'))
    .required(I18n.t('error.notBlankEmail')),
  phone: Yup.string()
    .matches(phoneRegExp, I18n.t('error.notValidPhone'))
    .required(I18n.t('error.notBlankPhone')),
  camera: Yup.boolean(),
  projectors: Yup.boolean(),
  electrolyser: Yup.boolean(),
  heatPump: Yup.boolean(),
  filtration: Yup.boolean(),
});

export default function OtherProfilePage({navigation, route}) {
  const [user] = useState(route?.params?.user);
  const {getManagementInfos} = useContext(ManagementContext);

  useEffect(() => {
    user &&
      user?.firstname &&
      user?.lastname &&
      navigation.setOptions({
        headerTitle: `${user?.firstname} ${user?.lastname}`,
      });
  }, [user]);

  const initialValues = {
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    mail: user?.mail || '',
    phone: user?.phone || '',
    camera: user?.permissions?.camera || false,
    projectors: user?.permissions?.projector || false,
    electrolyser: user?.permissions?.electrolyser || false,
    heatPump: user?.permissions?.heatPump || false,
    filtration: user?.permissions?.filtration || false,
  };

  // inputs refs
  const lastnameRef = useRef();
  const mailRef = useRef();
  const phoneRef = useRef();

  // gql
  const [updateUser] = useMutation(ManagementApi.updateUser, {
    onCompleted({updateUser: returnValue}) {
      if (returnValue) {
        getManagementInfos();
      }
    },
    onError(error) {
      if (!error?.message?.includes('Nothing has been modified')) {
        return errorAlert();
      }
    },
  });
  const [deleteUser, {loading: deleteUserLoading}] = useMutation(
    ManagementApi.deleteUser,
    {
      onCompleted({deleteUser: returnValue}) {
        if (returnValue) {
          getManagementInfos();
          navigation.goBack();
        }
      },
      onError() {
        return errorAlert();
      },
    },
  );

  function submit(values) {
    // todo add permissions in api modification request
    updateUser({
      variables: {
        userId: user?.id,
        phone: values?.phone,
        mail: values?.mail,
      },
    });
  }

  if (user) {
    return (
      <FormView>
        <Form
          onSubmit={submit}
          initialValues={initialValues}
          schema={schema}
          submitOnChange
          style={styles.form}>
          <>
            <TextField
              name="firstname"
              label={I18n.t('profile.firstname')}
              helperText={I18n.t('profile.firstnameInfo')}
              onSubmitEditing={() => lastnameRef?.current?.focus()}
            />
            <TextField
              innerRef={lastnameRef}
              name="lastname"
              label={I18n.t('profile.lastname')}
              onSubmitEditing={() => mailRef?.current?.focus()}
            />

            <TextField
              innerRef={mailRef}
              name="mail"
              keyboardType="email-address"
              label={I18n.t('profile.mail')}
              onSubmitEditing={() => phoneRef?.current?.focus()}
            />
            <TextField
              innerRef={phoneRef}
              name="phone"
              keyboardType="phone-pad"
              label={I18n.t('profile.phone')}
            />
            <TextField
              name="password"
              label={I18n.t('profile.password')}
              secureTextEntry
              disabled
              fakeValue="--------"
            />
            <CustomButton
              text={I18n.t('profile.editPassword')}
              textMode
              style={styles.editPassword}
              onPress={() =>
                navigation.navigate(RoutesNames.EditPasswordPage, {user})
              }
            />
            <Text style={styles.rights}>{I18n.t('profile.userRights')}</Text>
            <SwitchFieldForm
              name="camera"
              label={I18n.t('profile.rights.camera')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="projectors"
              label={I18n.t('profile.rights.projectors')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="electrolyser"
              label={I18n.t('profile.rights.electrolyser')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="heatPump"
              label={I18n.t('profile.rights.heatPump')}
              style={styles.switchField}
            />
            <SwitchFieldForm
              name="filtration"
              label={I18n.t('profile.rights.filtration')}
              style={styles.switchField}
            />
            <Divider style={styles.divider} />
            <CustomButton
              text={I18n.t('profile.deleteProfile')}
              customStyle={styles.btn}
              onPress={() => deleteUser({variables: {userId: user?.id}})}
              loading={deleteUserLoading}
            />
          </>
        </Form>
      </FormView>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
  },
  editPassword: {
    alignSelf: 'flex-start',
    marginTop: -15,
    marginLeft: -15,
  },
  form: {
    ...AppStyle.safeContainer,
    paddingBottom: 25,
  },
  rights: {
    marginTop: 30,
    ...Fonts.medium,
  },
  divider: {
    height: 1,
    marginTop: 15,
  },
  switchField: {marginVertical: 7},
});
