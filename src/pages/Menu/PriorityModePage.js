import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import Alignments from '../../theme/Alignments';
import i18n from '../../utils/localization/I18n';
import ManagementContext from '../../contexts/ManagementContext';
import {useMutation} from '@apollo/client';
import ManagementApi from '../../api/GQL/ManagementApi';
import {errorAlert} from '../../utils/Alert/errorAlert';
import WaterTempInfos from '../../components/WaterSettings/WaterTempInfos';
import RunningStateIndicatorCard from '../../components/RunningState/RunningStateIndicatorCard';
import WaterQualityIndicator from '../../components/Charts/WaterQualityIndicator';
import SwitchField from '../../components/Switch/SwitchField';
import {PRIORITY_MODE} from '../../utils/constants';
import InfosCard from '../../components/Cards/InfosCard';

export default function PriorityModePage({}) {
  const {water, getManagementInfos, priorityMode, devices} =
    useContext(ManagementContext);
  const [prioMode, setPrioMode] = useState(priorityMode);

  // gql
  const [setPriorityMode, {loading: setPriorityModeLoading}] = useMutation(
    ManagementApi.setPriorityMode,
    {
      onCompleted({setPriorityMode: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        // if error we reset switch value to real data
        setPrioMode(priorityMode || null);
        return errorAlert();
      },
    },
  );

  useEffect(() => {
    if (prioMode !== priorityMode) {
      setPriorityMode({
        variables: {value: prioMode ? prioMode : PRIORITY_MODE.filtration},
      });
    }
  }, [prioMode]);

  return (
    <ScrollView
      style={[Alignments.fill]}
      contentContainerStyle={styles.container}>
      {devices?.heatPump ? (
        <SwitchField
          isSwitchOn={prioMode === PRIORITY_MODE.heatPump}
          onToggleSwitch={() =>
            setPrioMode(
              prioMode === PRIORITY_MODE.heatPump
                ? PRIORITY_MODE.filtration
                : PRIORITY_MODE.heatPump,
            )
          }
          label={i18n.t('waterTemperature.prioMode')}
          disabled={setPriorityModeLoading}
          style={styles.switchField}
          reverse
        />
      ) : null}
      <WaterTempInfos />
      <RunningStateIndicatorCard
        item={i18n.t('myPool.heatPump')}
        running={water?.temp?.heatPumpStatus}
        customStyle={styles.runningStateCard}
      />
      <InfosCard
        text={i18n.t('waterTemperature.prioModeInfos')}
        customStyle={styles.marginHorizontal}
      />
      {devices?.electrolyser ? (
        <SwitchField
          isSwitchOn={prioMode === PRIORITY_MODE.electrolyser}
          onToggleSwitch={() =>
            setPrioMode(
              prioMode === PRIORITY_MODE.electrolyser
                ? PRIORITY_MODE.filtration
                : PRIORITY_MODE.electrolyser,
            )
          }
          label={i18n.t('waterQuality.prioModeElectrolyser')}
          disabled={setPriorityModeLoading}
          style={styles.switchField}
          reverse
        />
      ) : null}
      <WaterQualityIndicator noNavigation customStyle={styles.waterQuality} />
      <InfosCard
        text={i18n.t('waterQuality.prioModeInfos')}
        customStyle={styles.marginHorizontal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {paddingBottom: 25},
  runningStateCard: {marginTop: 21, marginBottom: 14},
  switchField: {
    paddingHorizontal: 31,
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  marginHorizontal: {marginHorizontal: 31},
  waterQuality: {
    marginBottom: 20,
  },
});
