import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {screenWidth} from '../../utils/constants';

export default function DropDownPickerComponent({
  pickerItems,
  selectedValue,
  setSelectedValue,
  placeholder,
  emptyValue,
  zIndex,
  zIndexInverse,
  small,
  containerStyle,
  hideValuePlaceholder,
  loading,
}) {
  const [open, setopen] = useState(false);
  const [items, setItems] = useState(pickerItems);

  return (
    <View style={[containerStyle, {zIndex: zIndex ? zIndex : undefined}]}>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setopen}
        setValue={setSelectedValue}
        setItems={setItems}
        style={[styles.picker, small && styles.smallPicker]}
        placeholder={
          (!hideValuePlaceholder && selectedValue) || emptyValue || ''
        }
        dropDownContainerStyle={[styles.dropDown, small && styles.smallPicker]}
        listMode={'SCROLLVIEW'}
        dropDownDirection="BOTTOM"
        ArrowUpIconComponent={() =>
          loading ? (
            <ActivityIndicator size={20} color={Colors.black} />
          ) : (
            <MaterialIcons
              name={'arrow-drop-up'}
              size={30}
              color={Colors.black}
            />
          )
        }
        ArrowDownIconComponent={() =>
          loading ? (
            <ActivityIndicator size={20} color={Colors.black} />
          ) : (
            <MaterialIcons
              name={'arrow-drop-down'}
              size={30}
              color={Colors.black}
            />
          )
        }
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
      <Text style={[styles.placeholder, {zIndex: zIndex ? zIndex : undefined}]}>
        {placeholder}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 40,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.PALETTE_08_GREY_400,
    marginBottom: 18,
    backgroundColor: Colors.BACKGROUND_DEFAULT,
  },
  smallPicker: {width: screenWidth * 0.36},
  dropDown: {
    backgroundColor: Colors.BACKGROUND_DEFAULT,
    borderWidth: 1,
    borderColor: Colors.PALETTE_08_GREY_400,
  },
  placeholder: {
    backgroundColor: Colors.BACKGROUND_DEFAULT,
    ...Fonts.little,
    color: Colors.TEXT_A_DARK_B_MEDIUM_EMPHASIS_TEXT_SECONDARY,
    marginLeft: 10,
    paddingHorizontal: 5,
    position: 'absolute',
    top: -8,
  },
});
