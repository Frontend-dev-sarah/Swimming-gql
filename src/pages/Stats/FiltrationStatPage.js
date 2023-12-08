import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import FiltrationChart from '../../components/Charts/FiltrationChart';
import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';

export default function FiltrationStatPage() {
  return (
    <ScrollView style={[Alignments.fill]}>
      <FiltrationChart />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  graphStyle: {
    paddingTop: 0,
    paddingRight: 70,
    ...Alignments.selfCenter,
  },
});
