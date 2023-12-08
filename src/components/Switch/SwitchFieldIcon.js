import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import Switch from './Switch';

export default function SwitchFieldIcon({
  isSwitchOn,
  onToggleSwitch,
  label,
  disabled,
  icon,
  style,
}) {
  return (
    <TouchableOpacity
      style={[Alignments.rowCross, style]}
      onPress={onToggleSwitch}>
      <MaterialCommunityIcons
        name={icon}
        color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
        size={24}
        style={styles.icon}
      />
      <Text style={Fonts.medium}>{label}</Text>
      <Switch
        onToggleSwitch={onToggleSwitch}
        isSwitchOn={isSwitchOn}
        disabled={disabled}
        customStyle={styles.switch}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {marginRight: 8},
  switch: {marginLeft: 10},
});
