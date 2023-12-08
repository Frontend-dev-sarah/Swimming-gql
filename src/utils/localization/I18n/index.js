import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import de from './de';
import en from './en';
import es from './es';
import fr from './fr';
import it from './it';
import pt from './pt';

const locales = RNLocalize.getLocales();

// I18n.fallbacks = true;
I18n.translations = {
  fr,
  en,
  es,
  it,
  de,
  pt,
};

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageCode;
}

export default I18n;
