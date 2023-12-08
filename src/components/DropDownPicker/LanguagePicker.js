import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Text} from 'react-native-paper';
import I18n from 'i18n-js';
import CountryFlag from 'react-native-country-flag';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import Alignments from '../../theme/Alignments';
import UserContext from '../../contexts/UserContext';

export default function LanguagePicker() {
  const navigation = useNavigation();
  const languageValues = Object.keys(I18n.t('params.languages')).reduce(
    (res, val) => {
      res.push({
        label: I18n.t(`params.languages.${val}`),
        value: I18n.t(`params.languagesCode.${val}`),
      });
      return res;
    },
    [],
  );
  const {language, setLanguage} = useContext(UserContext);
  const [open, setopen] = useState(false);
  const [, setItems] = useState();

  function getValueFromISOCode() {
    switch (language) {
      case 'fr':
        return I18n.t('params.languages.french');
      case 'gb':
        return I18n.t('params.languages.english');
      case 'en':
        return I18n.t('params.languages.english');
      case 'de':
        return I18n.t('params.languages.german');
      case 'it':
        return I18n.t('params.languages.italian');
      case 'pt':
        return I18n.t('params.languages.portuguese');
      case 'es':
        return I18n.t('params.languages.spanish');
      default:
        return I18n.t('params.languages.french');
    }
  }

  // forceUpdate force page to update when we change language
  const forceUpdate = React.useReducer(bool => !bool)[1];
  useEffect(() => {
    forceUpdate();
    // this line will update header title each time we change language
    navigation.setOptions({});
  }, [language]);

  return (
    <View style={[styles.container]}>
      {language ? (
        <CountryFlag
          isoCode={language === 'en' ? 'gb' : language}
          style={styles.flag}
        />
      ) : null}
      <View style={Alignments.fill}>
        <Text style={[styles.placeholder]}>
          {I18n.t('params.selectLanguage')}
        </Text>
        <DropDownPicker
          open={open}
          value={language}
          items={languageValues}
          setOpen={setopen}
          setValue={value => setLanguage(value())}
          setItems={setItems}
          style={[styles.picker]}
          placeholder={getValueFromISOCode() || ''}
          dropDownContainerStyle={[styles.dropDown]}
          listMode={'SCROLLVIEW'}
          dropDownDirection="BOTTOM"
          textStyle={styles.txt}
          // zIndexInverse={zIndexInverse}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 31,
    ...Alignments.rowCross,
    zIndex: 10, // for iOS
    elevation: 10, // for android
  },
  picker: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PALETTE_08_GREY_400,
    marginBottom: 18,
    backgroundColor: Colors.BACKGROUND_DEFAULT,
  },
  dropDown: {
    backgroundColor: Colors.BACKGROUND_DEFAULT,
    borderWidth: 1,
    borderColor: Colors.PALETTE_08_GREY_400,
  },
  placeholder: {
    backgroundColor: Colors.BACKGROUND_DEFAULT,
    ...Fonts.little,
    color: Colors.TEXT_A_DARK_B_MEDIUM_EMPHASIS_TEXT_SECONDARY,
    paddingHorizontal: 5,
  },
  txt: {
    ...Fonts.medium,
    ...Fonts.light,
    color: Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY,
  },
  flag: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 20,
  },
});
