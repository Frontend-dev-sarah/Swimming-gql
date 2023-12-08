import React from 'react';
import {ScrollView} from 'react-native';
import CumulativeChart from '../../components/Charts/CumulativeChart';
import Alignments from '../../theme/Alignments';

export default function CumulativeStatsPage() {
  return (
    <ScrollView style={[Alignments.fill]}>
      <CumulativeChart />
    </ScrollView>
  );
}
