import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Colors from '../../theme/Colors';
import {monthes, screenWidth} from '../../utils/constants';

const chloreArray = [4, 4, 4, 5, 6, 6, 7, 8, 7, 5, 4, 4.5, 4, 4];
const phArray = [1, 1, 2, 3, 4, 4, 3, 4, 3.6, 3, 2, 1, 0.5, 0.5];

const chloreMin = 5;
const chloreMax = 7;
const phMin = 1;
const phMax = 3;
const LINE_CHART_HEIGHT = 230;

export default function PhAndChloreChart({
  phVisible,
  chloreVisible,
  setSelectedMonth,
}) {
  const [datas, setDatas] = useState();

  useEffect(() => {
    setDatas({
      labels: monthes,
      datasets: [
        {
          data: chloreArray,
          color: () => (chloreVisible ? Colors.TURQUOISE : Colors.transparent),
        },
        {
          data: phArray,
          color: () => (phVisible ? Colors.PASTEQUE : Colors.transparent),
        },
      ],
    });
  }, [phVisible, chloreVisible]);

  function renderComfortZoneLines() {
    const arrayValues = chloreArray
      ? chloreArray.concat(...(phArray ? phArray : []))
      : phArray
      ? phArray
      : [];
    const chloreBottomPosition =
      (chloreMin * LINE_CHART_HEIGHT) / Math.max(...arrayValues);
    const chloreTopPosition =
      (chloreMax * LINE_CHART_HEIGHT) / Math.max(...arrayValues);
    const phBottomPosition =
      (phMin * LINE_CHART_HEIGHT) / Math.max(...arrayValues);
    const phTopPosition =
      (phMax * LINE_CHART_HEIGHT) / Math.max(...arrayValues);
    return (
      <View style={styles.decoratorContainer}>
        {chloreArray?.length && chloreVisible ? (
          <View
            style={[
              styles.decorator,
              styles.decoratorChlore,
              {
                bottom: chloreBottomPosition,
                top: LINE_CHART_HEIGHT - chloreTopPosition,
              },
            ]}
          />
        ) : null}
        {phArray?.length && phVisible ? (
          <View
            style={[
              styles.decorator,
              styles.decoratorPh,
              {
                bottom: phBottomPosition,
                top: LINE_CHART_HEIGHT - phTopPosition,
              },
            ]}
          />
        ) : null}
      </View>
    );
  }

  if (datas && datas?.datasets?.length) {
    return (
      <LineChart
        data={datas}
        width={screenWidth + 40}
        height={300}
        chartConfig={{
          backgroundGradientFrom: Colors.BACKGROUND_DEFAULT,
          backgroundGradientTo: Colors.BACKGROUND_DEFAULT,
          color: () => Colors.PASTEQUE,
          labelColor: () => Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY,
        }}
        style={styles.chartStyle}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        fromZero
        withShadow={false}
        withDots={false}
        transparent
        decorator={renderComfortZoneLines}
        onPress={event => {
          // we detect x position of the onPress event -> and we set selected month depending of this value
          const value =
            Math.floor(event?.nativeEvent?.locationX / (screenWidth / 14)) - 1;
          if (value >= 0 && value <= 11) {
            setSelectedMonth(value);
          } else if (value < 0) {
            setSelectedMonth(0);
          } else if (value > 11) {
            setSelectedMonth(11);
          }
        }}
      />
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  decoratorContainer: {
    height: LINE_CHART_HEIGHT,
  },
  decorator: {
    width: screenWidth + 10,
    borderStyle: 'dashed',
    marginLeft: -5,
    borderWidth: 1,
    borderRadius: 1,
    position: 'absolute',
  },
  decoratorPh: {
    backgroundColor: Colors.PASTEQUE10,
    borderColor: Colors.PASTEQUE,
  },
  decoratorChlore: {
    backgroundColor: Colors.TURQUOISE10,
    borderColor: Colors.TURQUOISE,
  },
  chartStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 0,
    paddingRight: 0,
  },
});
