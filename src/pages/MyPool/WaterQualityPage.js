import {useMutation} from '@apollo/client';
import moment from 'moment';
import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import ManagementApi from '../../api/GQL/ManagementApi';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import InfoButton from '../../components/BottomSheet/InfoButton';
import CustomButton from '../../components/Button/CustomButton';
import WaterQualityIndicator from '../../components/Charts/WaterQualityIndicator';
import PriorityModeCard from '../../components/WaterSettings/PriorityModeCard';
import ManagementContext from '../../contexts/ManagementContext';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import AppImage from '../../utils/AppImage';
import {PRIORITY_MODE} from '../../utils/constants';
import {errorAlert} from '../../utils/Alert/errorAlert';
import i18n from '../../utils/localization/I18n';
import {showConfirmAlert} from '../../utils/Alert/showConfirmAlert';

export default function WaterQualityPage({navigation}) {
  const {getManagementInfos, devices, water} = useContext(ManagementContext);
  const [infosVisible, setInfosVisible] = useState(false);
  const [electrolyserActive, setElectrolyserActive] = useState(
    water?.quality?.electrolyserStatus,
  );

  //gql
  const [phCalibration, {loading: phCalibrationLoading}] = useMutation(
    ManagementApi.phCalibration,
    {
      onCompleted({phCalibration: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    },
  );
  const [chlorineCalibration, {loading: chlorineCalibrationLoading}] =
    useMutation(ManagementApi.chlorineCalibration, {
      onCompleted({chlorineCalibration: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    });
  const [setElectrolyserStatus, {loading: setElectrolyserStatusLoading}] =
    useMutation(ManagementApi.setElectrolyserStatus, {
      onCompleted({setElectrolyserStatus: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    });

  useEffect(() => {
    if (water?.quality?.electrolyserStatus && !electrolyserActive) {
      setElectrolyserActive(true);
    } else if (electrolyserActive && !water?.quality?.electrolyserStatus) {
      setElectrolyserActive(false);
    }
  }, [water?.quality?.electrolyserStatus]);

  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <InfoButton visible={infosVisible} setVisible={setInfosVisible} />
      ),
    });
  }, [infosVisible, setInfosVisible, navigation]);

  function bottemSheetContent() {
    return (
      <Text style={Fonts.textBlack}>
        {"informations sur la qualité de l'eau"}
      </Text>
    );
  }

  return (
    <>
      <ScrollView>
        <WaterQualityIndicator noNavigation />
        <CustomButton
          text={i18n.t('waterQuality.calibratePh')}
          onPress={phCalibration} // todo redirect to ph calibration page
          customStyle={styles.btn}
          loading={phCalibrationLoading}
        />
        <Text style={styles.txt}>
          {i18n.t('waterQuality.lastCalibrationPh', {
            date: water?.quality?.lastPhCalibration
              ? moment(water?.quality?.lastPhCalibration).format('DD/MM/YYYY')
              : '-',
          })}
        </Text>
        <CustomButton
          text={i18n.t('waterQuality.calibrateChlore')}
          onPress={chlorineCalibration} // todo redirect to chlorine calibration page
          customStyle={styles.btn}
          loading={chlorineCalibrationLoading}
        />
        <Text style={styles.txt}>
          {i18n.t('waterQuality.lastCalibrationChlore', {
            date: water?.quality?.lastChlorineCalibration
              ? moment(water?.quality?.lastChlorineCalibration).format(
                  'DD/MM/YYYY',
                )
              : '-',
          })}
        </Text>
        {devices?.electrolyser ? (
          <>
            <PriorityModeCard
              title={i18n.t('waterQuality.electrolyser')}
              subtitle={i18n.t('waterQuality.prioModeElectrolyser')}
              imageSource={AppImage.electrolyser}
              priorityType={PRIORITY_MODE.electrolyser}
              disabled={!electrolyserActive}
            />
            <CustomButton
              text={
                electrolyserActive
                  ? i18n.t('waterQuality.switchOffElectrolyser')
                  : i18n.t('waterQuality.switchOnElectrolyser')
              }
              onPress={() =>
                showConfirmAlert({
                  title: i18n.t(
                    `waterQuality.${
                      electrolyserActive
                        ? 'switchOffElectrolyser'
                        : 'switchOnElectrolyser'
                    }`,
                  ),
                  onConfirm: () =>
                    setElectrolyserStatus({
                      variables: {
                        value: !electrolyserActive,
                      },
                    }),
                })
              }
              red={electrolyserActive}
              green={!electrolyserActive}
              customStyle={styles.btn}
              icon={electrolyserActive && 'power'}
              loading={setElectrolyserStatusLoading}
            />
          </>
        ) : null}
      </ScrollView>
      <CustomBottomSheet
        setVisible={setInfosVisible}
        visible={infosVisible}
        children={bottemSheetContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 31,
    ...Alignments.selfStretch,
    marginTop: 24,
  },
  txt: {
    ...Alignments.textCenter,
    marginHorizontal: 31,
    marginTop: 8,
    fontSize: 10,
    letterSpacing: 0.5,
    color: Colors.TEXT_A_DARK_B_MEDIUM_EMPHASIS_TEXT_SECONDARY,
    ...Fonts.uppercase,
  },
});
