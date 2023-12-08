import React, {useContext, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import Alignments from '../../theme/Alignments';
import i18n from '../../utils/localization/I18n';
import {Text} from 'react-native-paper';
import CustomButton from '../../components//Button/CustomButton';
import ManagementContext from '../../contexts/ManagementContext';
import DropDownPickerComponent from '../../components/DropDownPicker/DropDownPickerComponent';
import PoolParamsContext from '../../contexts/PoolParamsContext';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import BluetoothConnectionContent from '../../components/BottomSheet/BluetoothConnectionContent';

export default function PoolParamsPage({}) {
  const {devices} = useContext(ManagementContext);
  const [pairingOpen, setPairingOpen] = useState(false);
  const {
    projectorModels,
    setProjectorsModel,
    setProjectorsModelLoading,
    electrolyserModels,
    setElectrolyserModel,
    setElectrolyserModelLoading,
    heatPumpModels,
    setHeatPumpModel,
    setHeatPumpModelLoading,
    filtrationPumpModels,
    setFiltrationPumpModel,
    setFiltrationPumpModelLoading,
  } = useContext(PoolParamsContext);

  function renderSection({
    title,
    placeholder,
    onChange,
    selectedValue,
    itemsList,
    small,
    loading,
    index = 0, // usefull to avoid dropdowns to overlap each others
  }) {
    return (
      <>
        <Text style={styles.title}>{title}</Text>
        <DropDownPickerComponent
          pickerItems={itemsList}
          selectedValue={selectedValue}
          setSelectedValue={value => {
            onChange && onChange({variables: {value: value()}});
          }}
          placeholder={placeholder}
          containerStyle={small && styles.smallPicker}
          hideValuePlaceholder
          loading={loading}
          zIndex={1000 * 7 - index}
          zIndexInverse={1000 - index}
        />
      </>
    );
  }

  return (
    <>
      <ScrollView
        style={[Alignments.fill]}
        contentContainerStyle={styles.container}>
        <CustomButton
          text={i18n.t('poolParams.pairCard')}
          onPress={() => setPairingOpen(true)}
        />
        {renderSection({
          title: i18n.t('poolParams.pool'),
          placeholder: i18n.t('poolParams.waterVolume'),
          onChange: null, // todo route pour changer le volume d'eau
          selectedValue: devices?.poolVolume,
          itemsList: [50, 60, 70, 80, 90, 100].reduce((res, val) => {
            res.push({label: `${val} m³`, value: val});
            return res;
          }, []),
          small: true,
          index: 0,
        })}
        {renderSection({
          title: i18n.t('menu.items.projector'),
          placeholder: i18n.t('poolParams.projectorType'),
          onChange: setProjectorsModel,
          selectedValue: devices?.projectors,
          itemsList: projectorModels?.reduce((res, item) => {
            res.push({label: item?.label, value: item?.id});
            return res;
          }, []),
          loading: setProjectorsModelLoading,
          index: 1,
        })}
        {renderSection({
          title: i18n.t('menu.items.electrolyser'),
          placeholder: i18n.t('poolParams.electrolyserType'),
          onChange: setElectrolyserModel,
          selectedValue: devices?.electrolyser,
          itemsList: electrolyserModels?.reduce((res, item) => {
            res.push({label: item?.label, value: item?.id});
            return res;
          }, []),
          loading: setElectrolyserModelLoading,
          index: 2,
        })}
        {renderSection({
          title: i18n.t('menu.items.heatPump'),
          placeholder: i18n.t('poolParams.heatPumpType'),
          onChange: setHeatPumpModel,
          selectedValue: devices?.heatPump,
          itemsList: heatPumpModels?.reduce((res, item) => {
            res.push({label: item?.label, value: item?.id});
            return res;
          }, []),
          loading: setHeatPumpModelLoading,
          index: 3,
        })}
        {renderSection({
          title: i18n.t('poolParams.filtrationPump'),
          placeholder: i18n.t('poolParams.filtrationPumpType'),
          onChange: setFiltrationPumpModel,
          selectedValue: devices?.filtrationPump,
          itemsList: filtrationPumpModels?.reduce((res, item) => {
            res.push({label: item?.label, value: item?.id});
            return res;
          }, []),
          loading: setFiltrationPumpModelLoading,
          index: 4,
        })}
      </ScrollView>
      <CustomBottomSheet
        setVisible={setPairingOpen}
        visible={pairingOpen}
        children={() => (
          <BluetoothConnectionContent
            open={pairingOpen}
            setOpen={setPairingOpen}
          />
        )}
        customHeight={'75%'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 21,
    paddingBottom: 130,
    minHeight: '100%',
    paddingHorizontal: 31,
  },
  smallPicker: {
    paddingRight: '30%',
  },
  title: {
    marginTop: 25,
    marginBottom: 15,
  },
});
