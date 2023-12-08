import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import I18n from 'i18n-js';

import Alignments from '../../theme/Alignments';
import CustomButton from '../../components/Button/CustomButton';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import ManagementContext from '../../contexts/ManagementContext';
import {useMutation} from '@apollo/client';
import {errorAlert} from '../../utils/Alert/errorAlert';
import ManagementApi from '../../api/GQL/ManagementApi';
import {showConfirmAlert} from '../../utils/Alert/showConfirmAlert';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import FiltrationDialCarousel from '../../components/Charts/FiltrationDialCarousel';

export default function FiltrationPage() {
  const {getManagementInfos, water} = useContext(ManagementContext);
  const [filtrationActive, setFiltrationActive] = useState(
    water?.filtration?.status,
  );
  const [infosVisible, setInfosVisible] = useState(false);

  // gql
  const [setFiltrationStatus, {loading: setFiltrationStatusLoading}] =
    useMutation(ManagementApi.setFiltrationStatus, {
      onCompleted({setFiltrationStatus: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    });

  useEffect(() => {
    if (water?.filtration?.status && !filtrationActive) {
      setFiltrationActive(true);
    } else if (filtrationActive && !water?.filtration?.status) {
      setFiltrationActive(false);
    }
  }, [water?.filtration?.status]);

  function onPressChangeFiltrationStatus() {
    showConfirmAlert({
      title: I18n.t(
        `filtration.${
          filtrationActive ? 'switchOffFiltration' : 'switchOnFiltration'
        }`,
      ),
      onConfirm: () =>
        setFiltrationStatus({
          variables: {
            value: !filtrationActive,
          },
        }),
    });
  }

  return (
    <>
      <ScrollView
        style={[Alignments.fill]}
        contentContainerStyle={styles.container}>
        <FiltrationDialCarousel
          setInfosVisible={() => setInfosVisible(!infosVisible)}
        />
        <CustomButton
          text={
            filtrationActive
              ? I18n.t('filtration.switchOffFiltration')
              : I18n.t('filtration.switchOnFiltration')
          }
          onPress={onPressChangeFiltrationStatus}
          icon={filtrationActive && 'power'}
          red={filtrationActive}
          green={!filtrationActive}
          loading={setFiltrationStatusLoading}
          customStyle={styles.btn}
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
  container: {
    paddingBottom: getBottomSpace() + 100,
    minHeight: '100%',
  },
  graphStyle: {
    paddingTop: 0,
    paddingRight: 70,
    ...Alignments.selfCenter,
  },
  hoursRowCtnr: {
    ...Alignments.row,
  },
  hoursCtnr: {
    marginTop: 18,
    marginHorizontal: 31,
    marginBottom: 32,
  },
  pickerCtnr: {marginRight: 12},
  btn: {
    zIndex: -1,
    elevation: -1,
    // marginBottom: '100%',
    marginTop: 14,
  },
});
