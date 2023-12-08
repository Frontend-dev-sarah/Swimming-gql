import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Alignments from '../../theme/Alignments';
import Fonts from '../../theme/Fonts';
import Switch from './Switch';

export default function SwitchField({
  isSwitchOn,
  onToggleSwitch,
  label,
  disabled,
  style,
  reverse,
}) {
  return (
    <TouchableOpacity
      style={[Alignments.rowBetween, style]}
      onPress={onToggleSwitch}>
      {!reverse ? (
        <Text style={[Fonts.light, Fonts.little]}>{label}</Text>
      ) : null}
      <Switch
        onToggleSwitch={onToggleSwitch}
        isSwitchOn={isSwitchOn}
        disabled={disabled}
        customStyle={reverse && {marginRight: 15}}
      />
      {reverse ? (
        <Text style={[Fonts.light, Fonts.little]}>{label}</Text>
      ) : null}
    </TouchableOpacity>
  );
}
