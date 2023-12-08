import {useMutation} from '@apollo/client';
import React, {useContext, useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import * as Yup from 'yup';
import I18n from 'i18n-js';

import {Text} from 'react-native-paper';
import ManagementApi from '../../api/GQL/ManagementApi';
import Form from '../../components/formik/Form';
import FormView from '../../components/formik/FormView';
import UserContext from '../../contexts/UserContext';
import {errorAlert} from '../../utils/Alert/errorAlert';
import SubmitButton from '../../components/formik/SubmitButton';
import PasswordField from '../../components/formik/PasswordField';
import ManagementContext from '../../contexts/ManagementContext';
import Fonts from '../../theme/Fonts';
import Alignments from '../../theme/Alignments';

const schema = Yup.object().shape({
  password: Yup.string().required(I18n.t('error.notBlankPassword')),
  oldPassword: Yup.string().required(I18n.t('error.notBlankPassword')),
  passwordConfirmation: Yup.string()
    .required(I18n.t('error.notBlankPassword'))
    .oneOf([Yup.ref('password')], I18n.t('error.passwordsmustmatch')),
});

export default function EditPasswordPage({navigation, route}) {
  const [otherUser] = useState(route?.params?.user);
  const {user} = useContext(UserContext);
  const {users} = useContext(ManagementContext);

  const initialValues = {
    password: '',
    oldPassword: '',
    passwordConfirmation: '',
  };

  // inputs refs
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  // gql
  const [updateUserPassword] = useMutation(ManagementApi.updateUserPassword, {
    onCompleted() {
      navigation.goBack();
    },
    onError(error) {
      return errorAlert(
        error?.message === 'Bad old password'
          ? I18n.t('profile.badOldPassword')
          : null,
      );
    },
  });

  async function onSubmit(values) {
    await updateUserPassword({
      variables: {
        userId: otherUser ? otherUser.id : user?.id || users?.[0].id,
        password: values?.password,
        oldPassword: values?.oldPassword,
      },
    });
  }

  return (
    <FormView>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        schema={schema}
        style={styles.form}>
        <>
          <Text style={styles.title}>
            {otherUser
              ? I18n.t('profile.editUserPassword', {
                  userName: otherUser.firstname,
                })
              : I18n.t('profile.editYourPassword')}
          </Text>
          <PasswordField
            name="oldPassword"
            label={I18n.t('profile.oldPassword')}
            onSubmitEditing={() => passwordRef?.current?.focus()}
          />
          <PasswordField
            innerRef={passwordRef}
            name="password"
            label={I18n.t('profile.password')}
            onSubmitEditing={() => passwordConfirmationRef?.current?.focus()}
          />
          <PasswordField
            innerRef={passwordConfirmationRef}
            name="passwordConfirmation"
            label={I18n.t('profile.passwordConfirm')}
          />
          <SubmitButton
            label={I18n.t('profile.editPassword')}
            customStyle={styles.btn}
          />
        </>
      </Form>
    </FormView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    ...Fonts.medium,
    ...Alignments.textCenter,
  },
  form: {
    paddingVertical: 30,
  },
  btn: {marginTop: 30},
});
