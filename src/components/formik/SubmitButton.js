import {useFormikContext} from 'formik';
import React from 'react';
import CustomButton from '../Button/CustomButton';

export default function SubmitButton(props) {
  const {isSubmitting, isValid, submitForm} = useFormikContext();

  const disabled = isSubmitting || !isValid;

  return (
    <CustomButton
      text={props.label}
      disabled={disabled}
      onPress={submitForm}
      loading={isSubmitting}
      {...props}
    />
  );
}
