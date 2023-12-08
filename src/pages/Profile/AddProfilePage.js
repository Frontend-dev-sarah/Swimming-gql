import React, {useContext, useRef} from 'react';
import {StyleSheet} from 'react-native';
import I18n from 'i18n-js';
import * as Yup from 'yup';
import {Divider, Text} from 'react-native-paper';

import AppStyle from '../../theme/AppStyle';
import FormView from '../../components/formik/FormView';
import Form from '../../components/formik/Form';
import TextField from '../../components/formik/TextField';
import PasswordField from '../../components/formik/PasswordField';
import Fonts from '../../theme/Fonts';
import {useMutation} from '@apollo/client';
import ManagementApi from '../../api/GQL/ManagementApi';
import {errorAlert} from '../../utils/Alert/errorAlert';
import ManagementContext from '../../contexts/ManagementContext';
import SwitchFieldForm from '../../components/formik/SwitchFieldForm';
import SubmitButton from '../../components/formik/SubmitButton';

// const phoneRegExp = /^(33|0)(1|2|3|4|5|6|7|9)\d{8}$/;

const schema = Yup.object().shape({
  firstname: Yup.string().required(I18n.t('error.notBlankFirstname')),
  lastname: Yup.string().required(I18n.t('error.notBlankLastname')),
  mail: Yup.string()
    .email(I18n.t('error.notValidEmail'))
    .required(I18n.t('error.notBlankEmail')),
  // phone: Yup.string()
  //   .matches(phoneRegExp, I18n.t('error.notValidPhone'))
  //   .required(I18n.t('error.notBlankPhone')),
  password: Yup.string().required(I18n.t('error.notBlankPassword')),
  passwordConfirmation: Yup.string()
    .required(I18n.t('error.notBlankPassword'))
    .oneOf([Yup.ref('password')], I18n.t('error.passwordsmustmatch')),
  camera: Yup.boolean(),
  projectors: Yup.boolean(),
  electrolyser: Yup.boolean(),
  heatPump: Yup.boolean(),
  filtration: Yup.boolean(),
});

export default function AddProfilePage({navigation}) {
  const {getManagementInfos} = useContext(ManagementContext);

  const initialValues = {
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
    passwordConfirmation: '',
    // phone: '',
    camera: false,
    projectors: false,
    electrolyser: false,
    heatPump: false,
    filtration: false,
  };

  // inputs refs
  const lastnameRef = useRef();
  const mailRef = useRef();
  // const phoneRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // gql
  const [createUser, {loading: createUserLoading}] = useMutation(
    ManagementApi.createUser,
    {
      onCompleted({createUser: returnValue}) {
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

  async function submit(values) {
    await createUser({
      variables: {
        // phone: values?.phone,
        mail: values?.mail,
        firstname: values?.firstname,
        lastname: values?.lastname,
        password: values?.password,
        permissions: JSON.stringify({
          camera: values?.camera,
          projectors: values?.projectors,
          electrolyser: values?.electrolyser,
          heatPump: values?.heatPump,
          filtration: values?.filtration,
        }),
      },
    });
  }

  return (
    <FormView>
      <Form
        onSubmit={submit}
        initialValues={initialValues}
        schema={schema}
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
            // onSubmitEditing={() => phoneRef?.current?.focus()}
          />
          {/* <TextField
            innerRef={phoneRef}
            name="phone"
            keyboardType="phone-pad"
            label={I18n.t('profile.phone')}
            onSubmitEditing={() => passwordRef?.current?.focus()}
          /> */}
          <PasswordField
            innerRef={passwordRef}
            name="password"
            label={I18n.t('profile.password')}
            onSubmitEditing={() => passwordConfirmRef?.current?.focus()}
          />
          <PasswordField
            innerRef={passwordConfirmRef}
            name="passwordConfirmation"
            label={I18n.t('profile.passwordConfirm')}
          />
          <Text style={styles.rights}>{I18n.t('profile.userRights')}</Text>
          <SwitchFieldForm
            doNotSubmit
            name="camera"
            label={I18n.t('profile.rights.camera')}
            style={styles.switchField}
          />
          <SwitchFieldForm
            doNotSubmit
            name="projectors"
            label={I18n.t('profile.rights.projectors')}
            style={styles.switchField}
          />
          <SwitchFieldForm
            doNotSubmit
            name="electrolyser"
            label={I18n.t('profile.rights.electrolyser')}
            style={styles.switchField}
          />
          <SwitchFieldForm
            doNotSubmit
            name="heatPump"
            label={I18n.t('profile.rights.heatPump')}
            style={styles.switchField}
          />
          <SwitchFieldForm
            doNotSubmit
            name="filtration"
            label={I18n.t('profile.rights.filtration')}
            style={styles.switchField}
          />
          <Divider style={styles.divider} />
          <SubmitButton
            label={I18n.t('profile.createProfile')}
            customStyle={styles.btn}
          />
        </>
      </Form>
    </FormView>
  );
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
