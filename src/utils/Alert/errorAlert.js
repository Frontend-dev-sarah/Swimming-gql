import {Alert} from 'react-native';
import I18n from 'i18n-js';

// Display a generic error alert when api call failed
export function errorAlert(text, onPress) {
  Alert.alert(I18n.t('app.error'), text || I18n.t('app.trylater'), [
    {
      text: I18n.t('app.ok'),
      style: 'cancel',
      onPress: () => (onPress ? onPress() : null),
    },
  ]);
}
