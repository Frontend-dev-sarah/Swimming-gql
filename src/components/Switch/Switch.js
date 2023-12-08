import React from 'react';
import {Platform, Switch as SwitchComponent} from 'react-native';
import Colors from '../../theme/Colors';

export default function Switch({
  isSwitchOn,
  onToggleSwitch,
  disabled,
  customStyle,
  noAction,
}) {
  return (
    <SwitchComponent
      trackColor={{
        false: disabled ? Colors.PALETTE_08_GREY_300 : Colors.black50,
        true: disabled ? Colors.PALETTE_08_GREY_300 : Colors.PRIMARY_C_LIGHT,
      }}
      thumbColor={isSwitchOn && !disabled ? Colors.PRIMARY : Colors.white}
      ios_backgroundColor={
        disabled ? Colors.PALETTE_08_GREY_400 : Colors.black50
      }
      onValueChange={onToggleSwitch}
      value={isSwitchOn}
      disabled={disabled || noAction}
      style={[
        Platform.OS === 'ios' && {transform: [{scaleX: 0.8}, {scaleY: 0.8}]},
        customStyle,
      ]}
    />
  );
}
