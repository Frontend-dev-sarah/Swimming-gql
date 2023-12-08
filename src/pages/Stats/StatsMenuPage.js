import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SectionList, Text} from 'react-native';
import FiltrationChart from '../../components/Charts/FiltrationChart';
import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import MenuItem from '../Menu/components/MenuItem';
import i18n from '../../utils/localization/I18n';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import Fonts from '../../theme/Fonts';
import InfoButton from '../../components/BottomSheet/InfoButton';

export default function StatsMenuPage({navigation}) {
  const [infosVisible, setInfosVisible] = useState(false);

  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <InfoButton visible={infosVisible} setVisible={setInfosVisible} />
      ),
    });
  }, [infosVisible, setInfosVisible, navigation]);

  function bottemSheetContent() {
    return (
      <Text style={Fonts.textBlack}>{'informations sur les statistiques'}</Text>
    );
  }

  const DATA = [
    {
      title: i18n.t('stats.equipment'),
      data: ['filtration', 'heatPump', 'electrolyser'],
    },
    {
      title: i18n.t('stats.datas'),
      data: [
        'waterTemperature',
        'chloreRate',
        'ph',
        'dirtyingRate',
        'waterLevel',
      ],
    },
  ];

  return (
    <>
      <SectionList
        sections={DATA}
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <MenuItem key={item} item={item} white stats />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.title}>{title}</Text>
        )}
        ListHeaderComponent={() => (
          <MenuItem item={'cumulativeStats'} white stats />
        )}
      />
      <CustomBottomSheet
        setVisible={setInfosVisible}
        visible={infosVisible}
        children={bottemSheetContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    marginLeft: 30,
    marginVertical: 20,
  },
});
