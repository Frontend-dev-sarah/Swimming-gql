import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import RunningStateIndicator from './RunningStateIndicator';

export default function RunningStateIndicatorCard({
  item,
  running,
  onPress,
  customStyle,
}) {
  return (
    <Card style={[styles.heatPumpSurface, customStyle]} onPress={onPress}>
      <View style={[Alignments.rowCenter]}>
        <RunningStateIndicator item={item} running={running} />
        {onPress ? (
          <MaterialCommunityIcons
            name={'chevron-right'}
            size={24}
            style={[styles.icon]}
            color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
          />
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  heatPumpSurface: {
    paddingHorizontal: 16,
    paddingVertical: 19,
    borderRadius: 7,
    marginHorizontal: 61,
    backgroundColor: Colors.white,
  },
  icon: {
    marginLeft: 'auto',
  },
});
