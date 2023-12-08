import React, {useRef, useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import * as Yup from 'yup';
import I18n from 'i18n-js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Text} from 'react-native-paper';
import Form from '../../components/formik/Form';
import FormView from '../../components/formik/FormView';
import SubmitButton from '../../components/formik/SubmitButton';
import Alignments from '../../theme/Alignments';
import TextField from '../../components/formik/TextField';
import AppImage from '../../utils/AppImage';
import Colors from '../../theme/Colors';
import PasswordField from '../../components/formik/PasswordField';

const schema = Yup.object().shape({
  password: Yup.string().required(I18n.t('error.notBlankPassword')),
  passwordConfirmation: Yup.string()
    .required(I18n.t('error.notBlankPassword'))
    .oneOf([Yup.ref('password')], I18n.t('error.passwordsmustmatch')),
});

export default function ResetPasswordPage({route}) {
  const [reinitToken] = useState(route?.params?.token);

  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };

  // inputs refs
  const passwordConfirmationRef = useRef();

  // gql
  // ...

  async function onSubmit() {
    // await ...
    console.log('reset token ==>', reinitToken);
  }

  return (
    <>
      <FormView>
        <Form onSubmit={onSubmit} initialValues={initialValues} schema={schema}>
          <>
            <Image
              source={AppImage.logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <PasswordField
              name="password"
              label={I18n.t('profile.password')}
              onSubmitEditing={() => passwordConfirmationRef?.current?.focus()}
            />
            <PasswordField
              innerRef={passwordConfirmationRef}
              name="passwordConfirmation"
              label={I18n.t('profile.passwordConfirm')}
            />
            <SubmitButton label={I18n.t('auth.resetPassword')} />
          </>
        </Form>
      </FormView>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {width: '50%', ...Alignments.selfCenter, marginVertical: '-5%'},
});
