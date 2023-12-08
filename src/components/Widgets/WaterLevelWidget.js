import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {Card, Text} from 'react-native-paper';
import Fonts from '../../theme/Fonts';
import i18n from '../../utils/localization/I18n';
import {screenWidth} from '../../utils/constants';
import ManagementContext from '../../contexts/ManagementContext';
import AppImage from '../../utils/AppImage';

const CARD_WIDTH = (screenWidth - 8 - 62) / 2;
const CARD_HEIGHT = 160;

export default function WaterLevelWidget({}) {
  const {water} = useContext(ManagementContext);

  return (
    <Card style={styles.container}>
      <Text style={Alignments.textCenter}>
        {i18n.t('menu.items.waterLevel')}
      </Text>
      <MaterialCommunityIcons
        name={water?.level ? 'thumb-up' : 'thumb-down'}
        size={24}
        color={water?.level ? Colors.PRIMARY : Colors.ERROR}
        style={styles.icon}
      />
      <View style={styles.ceil}>
        <Image
          style={styles.wave}
          source={AppImage.wave}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.blue}>
        <Text style={[Fonts.light, Fonts.little]}>
          {water?.level
            ? i18n.t('myPool.goodLevel')
            : i18n.t('myPool.badLevel')}
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
  },
  icon: {
    ...Alignments.textCenter,
    marginTop: 4,
    zIndex: 2,
  },
  ceil: {
    height: 31,
    width: CARD_WIDTH + 2,
    borderColor: Colors.PRIMARY,
    borderStyle: 'dashed',
    borderRadius: 1,
    marginLeft: -1,
    borderWidth: 1,
    position: 'absolute',
    top: (CARD_HEIGHT - 31) / 2,
    zIndex: 1,
    ...Alignments.center,
  },
  wave: {
    width: CARD_WIDTH,
    height: 31 - 8,
  },
  blue: {
    backgroundColor: Colors.TURQUOISE,
    height: (CARD_HEIGHT - 31) / 2,
    marginTop: 'auto',
    ...Alignments.center,
  },
});
