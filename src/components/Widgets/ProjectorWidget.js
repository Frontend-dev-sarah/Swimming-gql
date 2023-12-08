import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {Card, Text} from 'react-native-paper';
import Fonts from '../../theme/Fonts';
import i18n from '../../utils/localization/I18n';
import {screenWidth} from '../../utils/constants';
import ManagementContext from '../../contexts/ManagementContext';
import Switch from '../Switch/Switch';
import RoutesNames from '../../navigation/RoutesNames';
import ManagementApi from '../../api/GQL/ManagementApi';
import {errorAlert} from '../../utils/Alert/errorAlert';

const CARD_WIDTH = (screenWidth - 8 - 62) / 2;
const CARD_HEIGHT = CARD_WIDTH;

export default function ProjectorWidget() {
  const {projectors, getManagementInfos} = useContext(ManagementContext);
  const [isOn, setIsOn] = useState(projectors?.status);
  const navigation = useNavigation();

  //gql
  const [setProjectorsStatus] = useMutation(ManagementApi.setProjectorsStatus, {
    onCompleted({setProjectorsStatus: returnValue}) {
      if (returnValue) {
        getManagementInfos();
      }
    },
    onError() {
      // if error we reset switch value to real data
      setIsOn(!isOn);
      return errorAlert();
    },
  });

  useEffect(() => {
    if (projectors?.status && !isOn) {
      setIsOn(true);
    } else if (isOn && !projectors?.status) {
      setIsOn(false);
    }
  }, [projectors?.status]);

  function onPressWidget() {
    navigation.navigate(RoutesNames.ProjectorsPage);
  }

  return (
    <Card style={styles.container} onPress={onPressWidget}>
      <Text style={[Alignments.textCenter, Fonts.text]}>
        {i18n.t('menu.items.projector')}
      </Text>
      <View style={[Alignments.rowCenter, Alignments.fill]}>
        <MaterialCommunityIcons
          name={'lightbulb-outline'}
          size={24}
          color={Colors.white}
          style={styles.icon}
        />
        <Switch
          isSwitchOn={isOn}
          customStyle={styles.switch}
          onToggleSwitch={() => {
            setIsOn(!isOn);
            setProjectorsStatus({
              variables: {
                value: !isOn,
              },
            });
          }}
        />
        <MaterialCommunityIcons
          name={'lightbulb-on'}
          size={24}
          color={Colors.white}
          style={styles.icon}
        />
      </View>
      <Text style={[Alignments.textCenter, Fonts.text, styles.link]}>
        {i18n.t('myPool.timer')}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    width: CARD_WIDTH,
    paddingTop: 7,
    height: CARD_HEIGHT,
    marginBottom: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.PRIMARY,
    paddingBottom: 17,
  },
  link: {
    textDecorationLine: 'underline',
    marginTop: 'auto',
  },
  switch: {
    marginHorizontal: 4,
  },
});
