import React from 'react';
import {StyleSheet, View} from 'react-native';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {Surface, Text} from 'react-native-paper';
import Fonts from '../../theme/Fonts';

export default function ChartLegend({title, rows, subtitle, style}) {
  function renderRow(row) {
    return (
      <View style={Alignments.row}>
        <View
          style={[
            styles.legendColor,
            {backgroundColor: row.color || Colors.PRIMARY},
          ]}
        />
        <Text style={[Fonts.light, Fonts.little]}>{row.value}</Text>
      </View>
    );
  }

  return (
    <Surface style={[styles.legendCtnr, style]}>
      <Text style={styles.legendTitle}>{title}</Text>
      {rows?.map(row => renderRow(row))}
      {subtitle ? <Text style={styles.legendSubtitle}>{subtitle}</Text> : null}
    </Surface>
  );
}

const styles = StyleSheet.create({
  legendCtnr: {
    borderRadius: 7,
    ...Alignments.selfCenter,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 17,
    elevation: 1,
    minWidth: '45%',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  legendTitle: {
    marginBottom: 5,
    marginLeft: 4,
    lineHeight: 22,
    color: Colors.TEXT_A_DARK_B_MEDIUM_EMPHASIS_TEXT_SECONDARY,
  },
  legendSubtitle: {
    marginLeft: 4,
    lineHeight: 22,
    color: Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY,
  },
});
