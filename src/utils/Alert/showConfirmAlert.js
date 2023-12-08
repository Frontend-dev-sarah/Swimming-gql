import {Alert} from 'react-native';
import I18n from 'i18n-js';

// Display a generic error alert when api call failed
export function showConfirmAlert({title, onConfirm}) {
  Alert.alert(title || '', I18n.t('app.confirmAction'), [
    {text: I18n.t('app.cancel'), style: 'cancel'},
    {
      text: I18n.t('app.ok'),
      onPress: onConfirm,
    },
  ]);
}
