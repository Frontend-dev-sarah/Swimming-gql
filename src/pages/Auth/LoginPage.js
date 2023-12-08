import React, {useRef, useContext, useState} from 'react';
import * as Yup from 'yup';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

import Form from '../../components/formik/Form';
import UserContext from '../../contexts/UserContext';
import TextField from '../../components/formik/TextField';
import SubmitButton from '../../components/formik/SubmitButton';
import i18n from '../../utils/localization/I18n';
import FormView from '../../components/formik/FormView';
import CheckboxFieldForm from '../../components/formik/CheckboxFieldForm';
import AppImage from '../../utils/AppImage';
import {screenHeight, screenWidth} from '../../utils/constants';
import Alignments from '../../theme/Alignments';
import AppStyle from '../../theme/AppStyle';
import CheckboxField from '../../components/CheckboxField';
import CustomButton from '../../components/Button/CustomButton';
import {Text} from 'react-native-paper';
import Fonts from '../../theme/Fonts';
import RoutesNames from '../../navigation/RoutesNames';

const schema = Yup.object().shape({
  // TODO define fields constraints
  login: Yup.string()
    // .email(i18n.t('error.notValidEmail'))
    .required(i18n.t('error.notBlankEmail')),
  password: Yup.string()
    // .min(8, i18n.t('error.notEnoughChar', {count: 8}))
    .required(i18n.t('error.notBlankPassword')),
  remember: Yup.boolean(),
});

export default function AuthLoadingPage({navigation}) {
  const {login} = useContext(UserContext);
  const [displayPassword, setDisplayPassword] = useState(false);
  const passwordInput = useRef();

  const initialValues = {
    login: (__DEV__ && 'testdesjoyaux') || '',
    password: (__DEV__ && 'test') || '',
    remember: false,
  };

  function findDealer() {
    // TODO
  }

  return (
    <FormView>
      <Form
        onSubmit={login}
        initialValues={initialValues}
        schema={schema}
        style={styles.form}>
        <View style={{minHeight: screenHeight}}>
          <Image
            source={AppImage.water}
            style={styles.headerImg}
            resizeMode="cover"
          />
          <Image
            source={AppImage.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={AppStyle.form}>
            <TextField
              name="login"
              label={i18n.t('auth.email')}
              onSubmitEditing={() => passwordInput?.current?.focus()}
              keyboardType="email-address"
            />
            <TextField
              name="password"
              innerRef={passwordInput}
              label={i18n.t('auth.password')}
              secureTextEntry={!displayPassword}
              onSubmitEditing={login}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'default'}
            />
            <CheckboxFieldForm
              name="remember"
              label={i18n.t('auth.remember')}
            />
            <CheckboxField
              checked={displayPassword}
              label={i18n.t('auth.displayPassword')}
              onPress={() => setDisplayPassword(!displayPassword)}
            />
            <SubmitButton
              label={i18n.t('auth.login')}
              customStyle={styles.submitBtn}
            />
            <CustomButton
              text={i18n.t('auth.forgotPassword')}
              icon="information-outline"
              textMode
              onPress={() =>
                navigation.navigate(RoutesNames.ForgotPasswordPage)
              }
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.disclaimer}>{i18n.t('auth.disclaimer')}</Text>
            <Text style={styles.clickable} onPress={findDealer}>
              {i18n.t('auth.findDealer')}
            </Text>
          </View>
        </View>
      </Form>
    </FormView>
  );
}

const styles = StyleSheet.create({
  headerImg: {
    width: screenWidth,
    height: screenHeight * 0.16,
  },
  logo: {
    width: '56%',
    ...Alignments.selfCenter,
    marginTop: -100,
    marginBottom: -30,
  },
  submitBtn: {marginVertical: 15},
  form: {paddingHorizontal: 0},
  disclaimer: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0,
    ...Alignments.textCenter,
  },
  bottom: {
    marginTop: 'auto',
    marginBottom: 27 + getBottomSpace(),
    paddingHorizontal: 30,
    ...Alignments.center,
  },
  clickable: {
    marginVertical: 8,
    textDecorationLine: 'underline',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
    ...Fonts.uppercase,
  },
});
