import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import RootNavigator from './navigation/RootNavigator';
import {UserProvider} from './contexts/UserContext';
import {paperTheme} from './theme/AppStyle';
import {StatusBar} from 'react-native';
import Colors from './theme/Colors';

export default function App() {
  return (
    <UserProvider>
      <PaperProvider theme={paperTheme}>
        <StatusBar translucent={true} backgroundColor={Colors.transparent} />
        <RootNavigator />
      </PaperProvider>
    </UserProvider>
  );
}
