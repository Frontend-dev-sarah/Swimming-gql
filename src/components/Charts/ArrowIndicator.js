import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../theme/Colors';
import {screenWidth} from '../../utils/constants';
import {getMonth} from '../../utils/TimeService';

const BAR_WIDTH = (screenWidth - 60) / 24;

export default function ArrowIndicator({selectedMonth}) {
  function getArrowPosition() {
    const monthNumber =
      (selectedMonth !== null ? selectedMonth : getMonth()) + 1;
    return BAR_WIDTH * monthNumber * 2 + BAR_WIDTH / 2;
  }

  return (
    <MaterialCommunityIcons
      name={'menu-down'}
      size={30}
      style={[
        {
          left: getArrowPosition(),
        },
      ]}
      color={Colors.black}
    />
  );
}
