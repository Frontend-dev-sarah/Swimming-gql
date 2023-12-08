import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {Chip, Text} from 'react-native-paper';

export default function FilterChip({name, selected, onPress, color, icon}) {
  return (
    <Chip
      icon={() => null}
      selected={selected}
      style={[Alignments.selfCenter, {backgroundColor: color}, styles.chip]}
      onPress={() => onPress && onPress(!selected)}>
      <View style={[Alignments.rowCenter, Alignments.fill]}>
        <Text style={styles.text}>{name}</Text>
        <MaterialCommunityIcons
          name={icon || (selected ? 'eye' : 'eye-off')}
          size={16}
          color={Colors.black}
        />
      </View>
    </Chip>
  );
}

const styles = StyleSheet.create({
  text: {marginRight: 5, lineHeight: 14},
  chip: {
    marginVertical: 4,
  },
});
