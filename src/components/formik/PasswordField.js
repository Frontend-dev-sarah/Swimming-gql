import {useField, useFormikContext} from 'formik';
import React, {useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../theme/Colors';
import {StyleSheet, View, Text, Platform} from 'react-native';
import Fonts from '../../theme/Fonts';
import AppStyle from '../../theme/AppStyle';

function PasswordField(props) {
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const [field, meta, helpers] = useField(props);
  const {isSubmitting} = useFormikContext();
  const {value} = field;
  const error = meta.touched ? meta.error : undefined;
  const valid = meta.touched ? !meta.error : undefined;

  function switchDisplayPassword() {
    setHiddenPassword(!hiddenPassword);
  }

  return (
    <View>
      <TextInput
        disabled={isSubmitting}
        value={value}
        onChangeText={helpers.setValue}
        error={error}
        valid={valid}
        onBlur={helpers.setTouched}
        secureTextEntry={hiddenPassword}
        ref={props.innerRef}
        mode="outlined"
        style={[AppStyle.textField]}
        returnKeyType={Platform.OS === 'ios' ? 'next' : 'default'}
        {...props}
      />
      <MaterialCommunityIcons
        onPress={switchDisplayPassword}
        name={hiddenPassword ? 'eye-outline' : 'eye-off-outline'}
        size={26}
        style={styles.inputIcon}
        color={Colors.black}
      />
      <HelperText type={error ? 'error' : 'info'} visible={props?.helperText}>
        {error || props?.helperText}
      </HelperText>
    </View>
  );
}

const styles = StyleSheet.create({
  inputIcon: {
    position: 'absolute',
    top: 23,
    right: 10,
    zIndex: 1000,
  },
});

export default PasswordField;
