import React from 'react';
import {StyleSheet, View} from 'react-native';
import Alignments from '../../theme/Alignments';
import CustomButton from '../Button/CustomButton';

export default function SwitchTextButton({
  selectedValue,
  value1,
  value2,
  changeValue,
}) {
  return (
    <View style={styles.switch}>
      <CustomButton
        text={value1}
        onPress={() => changeValue(value1)}
        customStyle={[styles.switchbtn, styles.left]}
        mode={selectedValue !== value1 ? 'outlined' : 'contained'}
      />
      <CustomButton
        text={value2}
        onPress={() => changeValue(value2)}
        customStyle={[styles.switchbtn, styles.right]}
        mode={selectedValue !== value2 ? 'outlined' : 'contained'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switch: {
    ...Alignments.rowCenter,
    marginHorizontal: 31,
  },
  switchbtn: {
    ...Alignments.fill,
    elevation: 0,
  },
  left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  right: {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
});
