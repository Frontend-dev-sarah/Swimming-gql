import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {monthes, screenWidth} from '../../utils/constants';
import ArrowIndicator from './ArrowIndicator';
import ChartLegend from './ChartLegend';
import FilterChip from './FilterChip';
import i18n from '../../utils/localization/I18n';

const FAKE_DATAS = [
  [0, 0, 10],
  [0, 0, 20],
  [20, 0, 15],
  [20, 15, 10],
  [25, 20, 40],
  [30, 40, 30],
  [40, 70, 20],
  [1, 1, 1], //
  [10, 0, 60],
  [0, 60, 60],
  [30, 30, 60],
  [10, 0, 60],
];

export default function CumulativeChart() {
  const [datas, setDatas] = useState();
  const [filtrationVisible, setFiltrationVisible] = useState(true);
  const [electrolyserVisible, setElectrolyserVisible] = useState(true);
  const [pumpVisible, setPumpVisible] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    filterChart();
  }, [filtrationVisible, electrolyserVisible, pumpVisible]);

  function filterChart() {
    let dataToUpdate = [];
    const colors = [];
    if (pumpVisible) {
      // dataToUpdate will always be empty in this if
      if (dataToUpdate?.length === 0) {
        dataToUpdate = FAKE_DATAS.reduce((res, item) => {
          item[0] !== (null || undefined) && res.push([item[0]]);
          return res;
        }, []);
      }
      colors.push(Colors.PASTEQUE);
    }
    if (electrolyserVisible) {
      if (dataToUpdate?.length === 0) {
        dataToUpdate = FAKE_DATAS.reduce((res, item) => {
          item[1] !== (null || undefined) && res.push([item[1]]);
          return res;
        }, []);
      } else {
        dataToUpdate.map((item, index) => item.push(FAKE_DATAS[index][1]));
      }
      colors.push(Colors.LAGOON);
    }
    if (filtrationVisible) {
      if (dataToUpdate?.length === 0) {
        dataToUpdate = FAKE_DATAS.reduce((res, item) => {
          item[2] !== (null || undefined) && res.push([item[2]]);
          return res;
        }, []);
      } else {
        dataToUpdate.map((item, index) => item.push(FAKE_DATAS[index][2]));
      }
      colors.push(Colors.TURQUOISE);
    }
    setDatas({
      labels: monthes,
      data: dataToUpdate,
      barColors: colors,
    });
  }

  return (
    <View style={styles.container}>
      <ChartLegend
        title={'Septembre 2021'}
        subtitle={'Total : 186kWh'}
        rows={[
          {
            color: Colors.PASTEQUE,
            value: '20kWh',
          },
          {
            color: Colors.LAGOON,
            value: '80kWh',
          },
          {
            color: Colors.TURQUOISE,
            value: '86kWh',
          },
        ]}
        style={styles.legend}
      />
      <ArrowIndicator selectedMonth={selectedMonth} />
      {datas && datas?.data?.length ? (
        <StackedBarChart
          style={styles.chartStyle}
          data={datas}
          width={screenWidth}
          height={300}
          chartConfig={{
            backgroundGradientFrom: Colors.BACKGROUND_DEFAULT,
            backgroundGradientTo: Colors.BACKGROUND_DEFAULT,
            color: () => Colors.transparent,
            labelColor: () => Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY,
            barRadius: 8,
            barPercentage: 0.5,
          }}
          withHorizontalLabels={false}
          hideLegend={true}
          onBarPress={({value, index}) => setSelectedMonth(index)}
        />
      ) : null}
      <FilterChip
        selected={filtrationVisible}
        onPress={setFiltrationVisible}
        name={i18n.t('charts.filtration')}
        color={Colors.TURQUOISE}
      />
      <FilterChip
        selected={electrolyserVisible}
        onPress={setElectrolyserVisible}
        name={i18n.t('charts.electrolyser')}
        color={Colors.LAGOON}
      />
      <FilterChip
        selected={pumpVisible}
        onPress={setPumpVisible}
        name={i18n.t('charts.heatPump')}
        color={Colors.PASTEQUE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartStyle: {
    paddingTop: 0,
    paddingRight: 70,
    ...Alignments.selfCenter,
  },
  container: {
    paddingTop: 50,
  },
  legend: {
    marginBottom: 5,
  },
});
