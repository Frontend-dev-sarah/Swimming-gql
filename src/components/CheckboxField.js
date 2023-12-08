import React from 'react';
import {Checkbox} from 'react-native-paper';
import Alignments from '../theme/Alignments';
import Colors from '../theme/Colors';

export default function CheckboxField({checked, onPress, label, ...props}) {
  return (
    <Checkbox.Item
      {...props}
      label={label}
      status={checked ? 'checked' : 'unchecked'}
      color={Colors.PRIMARY}
      position="leading"
      mode="android"
      labelStyle={Alignments.textLeft}
      onPress={onPress}
      style={[Alignments.noHorizontalPadding, Alignments.center, {height: 40}]}
    />
  );
}
