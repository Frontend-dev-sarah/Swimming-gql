import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, TouchableRipple} from 'react-native-paper';
import AppStyle from '../../theme/AppStyle';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

export default function CustomShip({onPress, isSelected, text, disabled}) {
  return (
    <TouchableRipple
      style={[
        styles.container,
        isSelected && styles.selected,
        disabled && styles.disabled,
        disabled && isSelected && styles.disabledSelected,
      ]}
      onPress={!disabled && onPress}>
      <Text
        style={[styles.text, isSelected && !disabled && styles.selectedTxt]}>
        {text}
      </Text>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.PRIMARY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    height: 25,
  },
  selected: {
    backgroundColor: Colors.PRIMARY,
  },
  text: {color: Colors.PRIMARY, lineHeight: 14, minHeight: 14},
  selectedTxt: {...Fonts.text},
  disabled: {borderColor: Colors.PALETTE_08_GREY_400},
  disabledSelected: {
    backgroundColor: Colors.PALETTE_08_GREY_400,
  },
});
