import React, {useEffect} from 'react';
import {IconButton} from 'react-native-paper';

import Colors from '../../theme/Colors';

export default function InfoButton({visible, setVisible}) {
  return (
    <IconButton
      icon="information"
      color={Colors.white}
      size={24}
      onPress={() => setVisible(!visible)}
    />
  );
}
