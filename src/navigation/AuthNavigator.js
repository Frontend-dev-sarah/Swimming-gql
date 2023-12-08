import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import I18n from 'i18n-js';

import RouteNames from './RoutesNames';
import LoginPage from '../pages/Auth/LoginPage';
import {headerStyle} from '../theme/AppStyle';
import {StatusBar} from 'react-native';
import RoutesNames from './RoutesNames';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';

const Stack = createStackNavigator();

const LogoutNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.LoginPage}
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RoutesNames.ForgotPasswordPage}
          component={ForgotPasswordPage}
          options={() => ({
            ...headerStyle,
            headerTitle: I18n.t('pages.ForgotPasswordPage'),
          })}
        />
        <Stack.Screen
          name={RoutesNames.ResetPasswordPage}
          component={ResetPasswordPage}
          options={() => ({
            ...headerStyle,
            headerTitle: I18n.t('pages.ResetPasswordPage'),
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default LogoutNavigator;
