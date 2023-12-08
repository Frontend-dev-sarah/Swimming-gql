import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import InfoButton from '../../components/BottomSheet/InfoButton';
import RunningStateIndicatorCard from '../../components/RunningState/RunningStateIndicatorCard';
import ManagementContext from '../../contexts/ManagementContext';
import Alignments from '../../theme/Alignments';
import Fonts from '../../theme/Fonts';
import AppImage from '../../utils/AppImage';
import i18n from '../../utils/localization/I18n';
import CustomButton from '../../components/Button/CustomButton';
import WaterTemperatureSelector from '../../components/WaterSettings/WaterTemperatureSelector';
import {useMutation} from '@apollo/client';
import ManagementApi from '../../api/GQL/ManagementApi';
import {errorAlert} from '../../utils/Alert/errorAlert';
import {PRIORITY_MODE} from '../../utils/constants';
import PriorityModeCard from '../../components/WaterSettings/PriorityModeCard';
import {showConfirmAlert} from '../../utils/Alert/showConfirmAlert';
import WaterTempInfos from '../../components/WaterSettings/WaterTempInfos';

export default function WaterTemperaturePage({navigation}) {
  const {water, getManagementInfos, devices} = useContext(ManagementContext);
  const [infosVisible, setInfosVisible] = useState(false);
  const [heatPumpActive, setHeatPumpActive] = useState(
    water?.temp?.heatPumpStatus,
  );

  //gql
  const [setHeatPumpStatus, {loading: setHeatPumpStatusLoading}] = useMutation(
    ManagementApi.setHeatPumpStatus,
    {
      onCompleted({setHeatPumpStatus: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    },
  );

  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <InfoButton visible={infosVisible} setVisible={setInfosVisible} />
      ),
    });
  }, [infosVisible, setInfosVisible, navigation]);

  useEffect(() => {
    if (water?.temp?.heatPumpStatus && !heatPumpActive) {
      setHeatPumpActive(true);
    } else if (heatPumpActive && !water?.temp?.heatPumpStatus) {
      setHeatPumpActive(false);
    }
  }, [water?.temp?.heatPumpStatus]);

  return (
    <>
      <ScrollView style={[Alignments.fill]}>
        <WaterTempInfos />
        <RunningStateIndicatorCard
          item={i18n.t('myPool.heatPump')}
          running={heatPumpActive}
          customStyle={styles.runningStateCard}
        />
        {devices?.heatPump ? (
          <>
            <Text style={[styles.targetTxt, Alignments.textCenter]}>
              {i18n.t('waterTemperature.tempTarget')}
            </Text>
            <WaterTemperatureSelector />
            <PriorityModeCard
              title={i18n.t('myPool.heatPump')}
              subtitle={i18n.t('waterTemperature.prioMode')}
              imageSource={AppImage.heatPump}
              priorityType={PRIORITY_MODE.heatPump}
              disabled={!heatPumpActive}
            />
          </>
        ) : (
          <Text style={[styles.targetTxt, Alignments.textCenter]}>
            {i18n.t('waterTemperature.noData')}
          </Text>
        )}
        <CustomButton
          text={
            heatPumpActive
              ? i18n.t('waterTemperature.switchOffPump')
              : i18n.t('waterTemperature.switchOnPump')
          }
          onPress={() =>
            showConfirmAlert({
              title: i18n.t(
                `waterTemperature.${
                  heatPumpActive ? 'switchOffPump' : 'switchOnPump'
                }`,
              ),
              onConfirm: () =>
                setHeatPumpStatus({
                  variables: {
                    value: !heatPumpActive,
                  },
                }),
            })
          }
          red={heatPumpActive}
          green={!heatPumpActive}
          customStyle={styles.btn}
          icon={heatPumpActive && 'power'}
          loading={setHeatPumpStatusLoading}
        />
      </ScrollView>
      <CustomBottomSheet
        setVisible={setInfosVisible}
        visible={infosVisible}
        webUrl={'https://www.google.fr'} // todo fill bottom sheet
      />
    </>
  );
}

const styles = StyleSheet.create({
  runningStateCard: {marginTop: 21, marginBottom: 14},
  targetTxt: {
    ...Fonts.medium,
  },
  btn: {marginTop: 32},
});
