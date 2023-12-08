import React from 'react';
import {useField, useFormikContext} from 'formik';
import SwitchField from '../Switch/SwitchField';

export default function SwitchFieldForm(props) {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props);
  const {isSubmitting, submitForm} = useFormikContext();
  const {value} = field;

  return (
    <SwitchField
      {...props}
      onToggleSwitch={() => {
        helpers?.setValue && helpers.setValue(!value);
        !props?.doNotSubmit && submitForm();
      }}
      isSwitchOn={value}
      disabled={isSubmitting}
    />
  );
}
