import {Formik} from 'formik';
import React, {useEffect, useRef} from 'react';
import {Keyboard, View} from 'react-native';
import AppStyle from '../../theme/AppStyle';

export default function Form({
  children,
  initialValues,
  onSubmit,
  schema,
  style,
  submitOnChange,
}) {
  const formRef = useRef();

  async function onSubmitForm(values) {
    await onSubmit(values);
  }

  useEffect(() => {
    // if we pass submitOnChange, we submit at each keyboard close
    if (submitOnChange) {
      const hideSubscription = Keyboard.addListener(
        'keyboardDidHide',
        () =>
          formRef?.current?.initialValues !== formRef?.current?.values &&
          onSubmitForm(formRef?.current?.values),
      );
      return () => {
        hideSubscription.remove();
      };
    }
  });

  return (
    <View style={[AppStyle.form, style]}>
      <Formik
        innerRef={formRef}
        enableReinitialize
        initialValues={initialValues || {}}
        onSubmit={onSubmitForm}
        validationSchema={schema}
        validateOnMount>
        {children}
      </Formik>
    </View>
  );
}
