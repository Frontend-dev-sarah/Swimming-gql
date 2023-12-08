import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {monthes, screenWidth} from '../../utils/constants';
import PhAndChloreChart from './PhAndChloreChart';
import ChartLegend from './ChartLegend';
import FilterChip from './FilterChip';
import i18n from '../../utils/localization/I18n';
import ArrowIndicator from './ArrowIndicator';

const values = [0, 20, 30, 45, 60, 90, 110, 50, 40, 30, 20, 10];

const FAKE_DATA_MONTH_CONSUMPTION = monthes.map((month, index) => ({
  month: month,
  data: values[index],
}));
const data_consumption = {
  labels: monthes,
  datasets: [
    {
      data: FAKE_DATA_MONTH_CONSUMPTION.map(item => item.data || 8), // if value === 0 we display bar with grey color and height of 8
      colors: FAKE_DATA_MONTH_CONSUMPTION.map(
        item => () =>
          item.data === 0 ? Colors.PALETTE_08_GREY_300 : Colors.PRIMARY,
      ),
    },
  ],
};

export default function FiltrationChart() {
  const [chloreVisible, setChloreVisible] = useState(true);
  const [phVisible, setPhVisible] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);

  return (
    <View style={styles.container}>
      <ChartLegend
        title={'Septembre 2021'}
        rows={[
          {
            color: Colors.PRIMARY,
            value: '50kWh',
          },
          {
            color: Colors.TURQUOISE,
            value: '7,3',
          },
          {
            color: Colors.PASTEQUE,
            value: '3,9',
          },
        ]}
        style={styles.legend}
      />
      <ArrowIndicator selectedMonth={selectedMonth} />
      <View style={styles.chartsContainer}>
        <BarChart
          data={data_consumption}
          width={screenWidth - 60}
          height={300}
          chartConfig={{
            backgroundGradientFrom: Colors.BACKGROUND_DEFAULT,
            backgroundGradientTo: Colors.BACKGROUND_DEFAULT,
            color: () => Colors.PRIMARY,
            labelColor: () => Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY,
            barRadius: 8,
            barPercentage: 0.5,
          }}
          withHorizontalLabels={false}
          fromZero
          showBarTops={false}
          withInnerLines={false}
          style={styles.barchartStyle}
          withCustomBarColorFromData
          flatColor
        />
        <PhAndChloreChart
          setSelectedMonth={setSelectedMonth}
          chloreVisible={chloreVisible}
          phVisible={phVisible}
        />
      </View>
      <FilterChip
        selected={chloreVisible}
        onPress={setChloreVisible}
        name={i18n.t('charts.chloreRate')}
        color={Colors.TURQUOISE}
      />
      <FilterChip
        selected={phVisible}
        onPress={setPhVisible}
        name={i18n.t('charts.ph')}
        color={Colors.PASTEQUE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barchartStyle: {
    paddingTop: 0,
    paddingRight: 0,
    ...Alignments.selfCenter,
    // zIndex: 1,
  },
  chartsContainer: {},
  container: {
    paddingTop: 50,
  },
  legend: {
    marginTop: 15,
    marginBottom: 23,
  },
});
