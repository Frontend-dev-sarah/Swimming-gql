import React, {useState} from 'react';
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

const schema = Yup.object().shape({
  mail: Yup.string()
    .email(I18n.t('error.notValidEmail'))
    .required(I18n.t('error.notBlankEmail')),
});

export default function ForgotPasswordPage({}) {
  const [emailSent, setEmailSent] = useState(false);

  const initialValues = {
    mail: '',
  };

  // gql
  // ...

  async function onSubmit() {
    // await ...
    setEmailSent(true);
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
            <Text style={styles.title}>
              {I18n.t('auth.resetPasswordExplain')}
            </Text>
            {!emailSent ? (
              <>
                <TextField
                  name="mail"
                  label={I18n.t('auth.email')}
                  keyboardType="email-address"
                />
                <SubmitButton label={I18n.t('auth.resetPassword')} />
              </>
            ) : (
              <View style={Alignments.row}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={25}
                  style={styles.check}
                  color={Colors.SUCCESS_B_DARK}
                />
                <Text style={Alignments.fill}>
                  {I18n.t('auth.resetPasswordAsked')}
                </Text>
              </View>
            )}
          </>
        </Form>
      </FormView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  logo: {width: '50%', ...Alignments.selfCenter, marginVertical: '-5%'},
  check: {marginRight: 15, ...Alignments.selfCenter},
});
