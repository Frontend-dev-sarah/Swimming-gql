import {useField, useFormikContext} from 'formik';
import React from 'react';
import {Platform} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import AppStyle from '../../theme/AppStyle';

function TextField(props) {
  const [field, meta, helpers] = useField(props);
  const {isSubmitting} = useFormikContext();
  const {value} = field;
  const error = meta.touched ? meta.error : undefined;
  const valid = meta.touched ? !meta.error : undefined;

  return (
    <>
      <TextInput
        disabled={isSubmitting}
        value={value || props.fakeValue}
        onChangeText={helpers.setValue}
        error={error}
        valid={valid}
        onBlur={helpers.setTouched}
        mode="outlined"
        style={[AppStyle.textField]}
        autoCapitalize="none"
        ref={props.innerRef}
        returnKeyType={
          props.returnKeyType
            ? props.returnKeyType
            : Platform.OS === 'ios'
            ? 'next'
            : 'default'
        }
        {...props}
      />
      <HelperText type={error ? 'error' : 'info'} visible={props?.helperText}>
        {error || props?.helperText}
      </HelperText>
    </>
  );
}

export default TextField;
