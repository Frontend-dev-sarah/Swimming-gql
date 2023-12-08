import React from 'react';
import {Button} from 'react-native-paper';
import Alignments from '../../theme/Alignments';
import AppStyle from '../../theme/AppStyle';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

export default function CustomButton({
  text,
  onPress,
  disabled,
  customStyle,
  red,
  green,
  icon,
  textMode,
  reverse, // used to display icon at right side
  ...props
}) {
  return (
    <Button
      style={[
        AppStyle.btn,
        red && props.mode === 'outlined'
          ? AppStyle.btnRedOutlined
          : red
          ? AppStyle.btnRed
          : green && props.mode === 'outlined'
          ? AppStyle.btnGreenOutlined
          : green && AppStyle.btnGreen,
        customStyle,
      ]}
      color={red ? Colors.ERROR : green ? Colors.SUCCESS_B_DARK : undefined}
      mode={props.mode || (textMode ? 'text' : 'contained')}
      onPress={onPress}
      disabled={disabled || props.loading}
      contentStyle={[AppStyle.btn, reverse && Alignments.rowReverse]}
      icon={icon}
      theme={{
        fonts: {
          medium: {
            color: textMode
              ? Colors.PRIMARY
              : red && props.mode === 'outlined'
              ? Colors.ERROR
              : green && props.mode === 'outlined'
              ? Colors.SUCCESS_B_DARK
              : props.mode === 'outlined'
              ? Colors.PRIMARY
              : Colors.white,
            fontFamily: 'Lexend-Light',
            fontWeight: '400',
            fontSize: 13,
            lineHeight: 13,
            letterSpacing: 0.15,
            ...Fonts.uppercase,
          },
        },
      }}
      {...props}>
      {text}
    </Button>
  );
}
