import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ManagementContext from '../../contexts/ManagementContext';
import Alignments from '../../theme/Alignments';

import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {displayDayFromNow} from '../../utils/TimeService';

export default function InfosCard({text, customStyle}) {
  return (
    <Card style={[styles.container, customStyle]}>
      <View style={Alignments.row}>
        <MaterialCommunityIcons
          name="information-outline"
          color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
          size={24}
          style={styles.icon}
        />
        <View style={Alignments.fill}>
          <Text style={[Fonts.little, Fonts.light]}>{text}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: Colors.PALETTE_08_GREY_300,
  },
  icon: {marginRight: 20},
});
