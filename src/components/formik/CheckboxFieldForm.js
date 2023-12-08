import React from 'react';
import {useField, useFormikContext} from 'formik';
import CheckboxField from '../CheckboxField';

export default function CheckboxFieldForm(props) {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props);
  const {isSubmitting} = useFormikContext();
  const {value} = field;

  return (
    <CheckboxField
      {...props}
      checked={value}
      disabled={isSubmitting}
      onPress={() => helpers?.setValue && helpers.setValue(!value)}
    />
  );
}
