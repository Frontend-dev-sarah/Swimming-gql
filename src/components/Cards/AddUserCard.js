import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
import I18n from 'i18n-js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {screenWidth} from '../../utils/constants';
import RoutesNames from '../../navigation/RoutesNames';

export default function AddUserCard() {
  const navigation = useNavigation();

  return (
    <Card
      style={[styles.container]}
      onPress={() => navigation.navigate(RoutesNames.AddProfilePage)}>
      <MaterialCommunityIcons
        name="plus-circle-outline"
        size={24}
        style={styles.icon}
        color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
      />
      <Text style={Alignments.textCenter}>{I18n.t('profile.addUser')}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    backgroundColor: Colors.transparent,
    width: screenWidth * 0.25,
    ...Alignments.fill,
    paddingVertical: 30,
    marginHorizontal: 10,
    elevation: 0,
    borderWidth: 1,
    borderColor: Colors.PALETTE_08_GREY_400,
  },
  label: {
    ...Fonts.uppercase,
  },
  icon: {
    ...Alignments.selfCenter,
    marginBottom: 10,
    textAlignVertical: 'center',
  },
});
