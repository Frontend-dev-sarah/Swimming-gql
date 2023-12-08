import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import i18n from '../../utils/localization/I18n';

export default function RunningStateIndicator({item, running}) {
  return (
    <View style={[Alignments.rowCross, Alignments.selfCenter]}>
      <View
        style={[
          styles.runningIndicator,
          {
            backgroundColor: running
              ? Colors.PALETTE_07_SUCCESS_A_MAIN
              : Colors.ERROR,
          },
        ]}
      />
      <Text style={[Fonts.little, Fonts.light]}>{`${item} ${
        running ? i18n.t('app.running') : i18n.t('app.notRunning')
      }`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  runningIndicator: {width: 16, height: 16, borderRadius: 8, marginRight: 8},
});
