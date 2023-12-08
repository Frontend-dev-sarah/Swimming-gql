import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import Alignments from '../../theme/Alignments';

export default function FormView({children, style}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[Alignments.fill, style]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={useHeaderHeight()}>
        <ScrollView nestedScrollEnabled keyboardShouldPersistTaps={'handled'}>
          {/* wrap with a TouchableOpacity to improve scroll performances */}
          <TouchableOpacity
            onPress={() => Keyboard.dismiss()}
            activeOpacity={1}>
            {children}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
