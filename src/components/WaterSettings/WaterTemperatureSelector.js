import {useMutation} from '@apollo/client';
import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import ManagementApi from '../../api/GQL/ManagementApi';
import ManagementContext from '../../contexts/ManagementContext';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {errorAlert} from '../../utils/Alert/errorAlert';

const MIN = 10;
const MAX = 33;

export default function WaterTemperatureSelector() {
  const {water, getManagementInfos} = useContext(ManagementContext);
  const [value, setValue] = useState(MIN);
  const [lessPressed, setLessPressed] = useState(false);
  const [morePressed, setMorePressed] = useState(false);

  useEffect(() => {
    if (water?.temp?.targetTemp) {
      setValue(
        water?.temp?.targetTemp > 100
          ? water?.temp?.targetTemp / 10
          : water?.temp?.targetTemp,
      );
    }
  }, [water?.temp?.targetTemp]);

  //gql
  const [setWaterTargetTemp, {loading: setWaterTargetTempLoading}] =
    useMutation(ManagementApi.setWaterTargetTemp, {
      onCompleted({setWaterTargetTemp: returnValue}) {
        setLessPressed(false);
        setMorePressed(false);
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        setLessPressed(false);
        setMorePressed(false);
        return errorAlert();
      },
    });

  function renderBar() {
    const activeFlex = ((value - MIN) * (MAX + MIN)) / 1000;
    return (
      <View style={styles.barCtnr}>
        <View style={[styles.selectedBar, {flex: activeFlex}]} />
        <View style={[styles.notSelectedBar, {flex: 1 - activeFlex}]} />
        <View style={[styles.pointOnBarCtnr, {left: `${activeFlex * 100}%`}]}>
          <View style={styles.cursor}>
            <Text style={[Fonts.text]}>{value}</Text>
          </View>
          <View style={styles.cursorBottom} />
          <View style={styles.pointOnBar} />
        </View>
        <View style={[styles.dotsCtnr]}>
          {new Array(7).fill(1).map((item, index) => {
            return (
              <View
                style={[
                  styles.dot,
                  index + 1 >= Math.floor(activeFlex * 10) &&
                    styles.inactiveDot,
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function onPressLess() {
    if (value > MIN) {
      setLessPressed(true);
      setWaterTargetTemp({
        variables: {
          value: value - 1,
        },
      });
    }
  }

  function onPressMore() {
    if (value < MAX) {
      setMorePressed(true);
      setWaterTargetTemp({
        variables: {
          value: value + 1,
        },
      });
    }
  }

  return (
    <View style={styles.container}>
      {lessPressed && setWaterTargetTempLoading ? (
        <ActivityIndicator
          style={styles.loader}
          size={26}
          color={Colors.PRIMARY}
        />
      ) : (
        <IconButton
          icon="minus"
          color={Colors.PRIMARY}
          size={26}
          onPress={!setWaterTargetTempLoading && onPressLess}
          style={styles.btn}
        />
      )}
      {renderBar()}
      {morePressed && setWaterTargetTempLoading ? (
        <ActivityIndicator
          style={styles.loader}
          size={26}
          color={Colors.PRIMARY}
        />
      ) : (
        <IconButton
          icon="plus"
          color={Colors.PRIMARY}
          size={26}
          onPress={!setWaterTargetTempLoading && onPressMore}
          style={styles.btn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    ...Alignments.rowBetween,
    marginHorizontal: 10,
  },
  barCtnr: {
    height: 2,
    flex: 1,
    borderRadius: 2,
    ...Alignments.row,
    marginHorizontal: 15,
  },
  selectedBar: {
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.PRIMARY,
  },
  notSelectedBar: {
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.PRIMARY20,
  },
  dotsCtnr: {
    position: 'absolute',
    left: 0,
    right: 0,
    ...Alignments.rowBetween,
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.white,
  },
  activeDot: {
    backgroundColor: Colors.white,
  },
  inactiveDot: {
    backgroundColor: Colors.PRIMARY,
  },
  pointOnBar: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: Colors.PRIMARY,
  },
  pointOnBarCtnr: {
    position: 'absolute',
    top: -53,
    zIndex: 10,
  },
  cursor: {
    width: 32,
    height: 32,
    borderRadius: 16,
    ...Alignments.center,
    backgroundColor: Colors.PRIMARY,
    left: -8,
  },
  cursorBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 14,
    borderLeftColor: Colors.transparent,
    borderRightColor: Colors.transparent,
    borderTopColor: Colors.PRIMARY,
    top: -7.7,
    left: -6,
  },
  btn: {
    backgroundColor: Colors.SECONDARY,
  },
  loader: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 20,
    padding: 6,
    margin: 6.5,
  },
});
