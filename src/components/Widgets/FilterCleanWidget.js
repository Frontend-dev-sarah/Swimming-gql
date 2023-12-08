import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {Card, Text} from 'react-native-paper';
import Fonts from '../../theme/Fonts';
import i18n from '../../utils/localization/I18n';
import {screenWidth} from '../../utils/constants';
import ManagementContext from '../../contexts/ManagementContext';

const CARD_WIDTH = (screenWidth - 8 - 62) / 2;
const CARD_HEIGHT = 160;

export default function FilterCleanWidget({}) {
  // TODO connect API datas
  const {water} = useContext(ManagementContext);

  return (
    <Card style={styles.container}>
      <Text style={Alignments.textCenter}>{i18n.t('myPool.filterClean')}</Text>
      <View style={Alignments.rowCross}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={'close'}
            size={32}
            color={Colors.PALETTE_08_GREY_500}
            style={styles.icon}
          />
        </View>
        <Text style={[Fonts.little, Fonts.light, styles.txt]}>
          {i18n.t('app.bad')}
        </Text>
      </View>
      <View style={Alignments.rowCross}>
        <View style={[styles.iconContainer, styles.iconCtnrSelected]}>
          <MaterialCommunityIcons
            name={'exclamation'}
            size={32}
            color={Colors.black}
            style={[styles.icon, styles.iconSelected]}
          />
        </View>
        <Text style={[Fonts.little, Fonts.light]}>{i18n.t('app.middle')}</Text>
      </View>
      <View style={Alignments.rowCross}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={'check'}
            size={32}
            color={Colors.PALETTE_08_GREY_500}
            style={styles.icon}
          />
        </View>
        <Text style={[Fonts.little, Fonts.light, styles.txt]}>
          {i18n.t('app.good')}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    width: CARD_WIDTH,
    paddingTop: 7,
    height: CARD_HEIGHT,
    marginBottom: 8,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  icon: {
    borderRadius: 16,
    backgroundColor: Colors.PALETTE_08_GREY_200,
    overflow: 'hidden',
  },
  iconContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.transparent,
    borderTopColor: Colors.PALETTE_08_GREY_200,
    padding: 3,
    marginTop: 1,
  },
  txt: {
    color: Colors.black50,
  },
  iconCtnrSelected: {
    borderTopColor: Colors.WARNING_A_MAIN,
  },
  iconSelected: {
    backgroundColor: Colors.WARNING_A_MAIN,
  },
});
