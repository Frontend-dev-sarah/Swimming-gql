import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';

import {setContext} from '@apollo/client/link/context';

import {API_URL} from '@env';
import UserContext from '../contexts/UserContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import AuthLoadingPage from '../pages/Auth/AuthLoadingPage';
import {navigationRef} from './NavigationService';
import {paperTheme} from '../theme/AppStyle';
import {ManagementProvider} from '../contexts/ManagementContext';
import {Platform} from 'react-native';
import {PoolParamsProvider} from '../contexts/PoolParamsContext';
import {dynamicLinksListnener} from '../utils/CustomLinking';

const RootNavigator = () => {
  const {authLoading, authToken} = useContext(UserContext);

  useEffect(() => {
    navigationRef?.current?.isReady() && dynamicLinksListnener();
  }, [navigationRef?.current?.isReady()]);

  function getApolloClient() {
    const httpLink = createHttpLink({
      uri: API_URL,
    });
    const authLink = setContext((_, {headers}) => {
      return {
        headers: {
          ...headers,
          'X-Auth-Token': authToken ? authToken : '',
          'x-application-id': 'com.desjoyaux.app',
          'x-origin': 'DESJOYAUX',
        },
      };
    });
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      name: 'Desjoyaux',
    });
  }

  return (
    <NavigationContainer ref={navigationRef} theme={paperTheme}>
      {authLoading ? (
        <AuthLoadingPage />
      ) : !authToken ? (
        <AuthNavigator />
      ) : (
        authToken && (
          <ApolloProvider client={getApolloClient()}>
            <ManagementProvider>
              <PoolParamsProvider>
                <AppNavigator />
              </PoolParamsProvider>
            </ManagementProvider>
          </ApolloProvider>
        )
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
