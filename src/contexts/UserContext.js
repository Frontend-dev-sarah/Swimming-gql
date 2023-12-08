import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {Sentry} from 'react-native-sentry';
import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

// import api from '../api/api';
import StorageKeys from '../utils/StorageKeys';
import i18n from '../utils/localization/I18n';
import UserApi from '../api/REST/UserApi';
import {
  checkPermission,
  registerNotifications,
} from '../services/notifications';

const UserContext = createContext();

export function UserProvider(props) {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [appInitialized, setAppInitialized] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [language, setLanguage] = useState(null); // language code selected

  useEffect(() => {
    checkExistingCredentials();
    getStoredLanguage();
    checkPermission();
  }, []);

  useEffect(() => {
    user && !appInitialized && initializeApp;
  }, [user]);

  function initializeApp() {
    Sentry.setUserContext({
      email: user.email,
      id: user.id,
      username: `${user.firstname} ${user.lastname}`,
    });
    registerNotifications();
    setAppInitialized(true);
  }

  // set app language every time we change it in AppParamsPage
  useEffect(() => {
    if (language) {
      I18n.locale = language;
      AsyncStorage.setItem(StorageKeys.language, JSON.stringify(language));
    }
  }, [language]);

  // we check if user has already set language on his phone
  async function getStoredLanguage() {
    const lang = await AsyncStorage.getItem(StorageKeys.language);
    // if user has already set language we change it for entire app
    if (JSON.parse(lang)) {
      setLanguage(JSON.parse(lang));
    } else {
      // if user did not set language we set by default with phone language
      const locales = RNLocalize.getLocales();
      if (Array.isArray(locales)) {
        I18n.locale = locales[0].languageCode;
        setLanguage(locales[0].languageCode);
      }
    }
  }

  async function login(values) {
    const {login, password, remember} = values;
    const res = await UserApi.getUserToken({username: login, password});
    if (res && !res.error) {
      setAuthToken(res.data.token);
      remember && storeUserToken(res.data.token);
      // temporaire
      // setUser({
      //   firstname: 'val',
      //   lastname: 'test',
      //   email: values.login,
      //   id: '12345',
      // });
      // TODO implement get user infos
      // await getUserInfos();
    } else {
      Alert.alert(i18n.t('app.error'), i18n.t('app.trylater'), [
        {text: i18n.t('app.ok'), style: 'cancel'},
      ]);
    }
  }

  // function to check if the user is already connected on the device and reconnect automatically
  async function checkExistingCredentials() {
    const userToken = await AsyncStorage.getItem(StorageKeys.userToken);
    setAuthToken(JSON.parse(userToken));
    // TODO route to refresh token ?
    //  if (userToken) {
    //    api.setAccessToken(userToken);
    //    const res = await UserApi.refreshAuthToken();
    //    console.log('==REFRESH TOKEN==>', res);
    //    if (res && !res.error) {
    //      storeUserToken(res?.access_token);
    //      await getUserInfos();
    //    } else {
    //        setAuthLoading(false);
    //    }
    //  } else {
    //      setAuthLoading(false);
    //  }

    setAuthLoading(false);
  }

  async function storeUserToken(token) {
    token && AsyncStorage.setItem(StorageKeys.userToken, JSON.stringify(token));
  }

  function logout() {
    AsyncStorage.removeItem(StorageKeys.userToken);
    setAuthToken(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        login,
        authLoading,
        authToken,
        language,
        setLanguage,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
