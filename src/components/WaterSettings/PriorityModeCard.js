import React, {useContext, useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
import ManagementContext from '../../contexts/ManagementContext';
import Alignments from '../../theme/Alignments';
import Fonts from '../../theme/Fonts';
import Switch from '../../components/Switch/Switch';
import {useMutation} from '@apollo/client';
import ManagementApi from '../../api/GQL/ManagementApi';
import {errorAlert} from '../../utils/Alert/errorAlert';
import {PRIORITY_MODE} from '../../utils/constants';
import Colors from '../../theme/Colors';

export default function PriorityModeCard({
  imageSource,
  title,
  subtitle,
  priorityType,
  disabled,
}) {
  const {getManagementInfos, priorityMode} = useContext(ManagementContext);
  const [prioModeIsOn, setPrioModeIsOn] = useState(
    priorityMode === priorityType,
  );
  //gql
  const [setPriorityMode] = useMutation(ManagementApi.setPriorityMode, {
    onCompleted({setPriorityMode: returnValue}) {
      if (returnValue) {
        getManagementInfos();
      }
    },
    onError() {
      // if error we reset switch value to real data
      setPrioModeIsOn(priorityMode === priorityType);
      return errorAlert();
    },
  });
  return (
    <Card style={[styles.card, disabled && styles.disabled]}>
      <View style={Alignments.rowCross}>
        <Image
          style={[styles.img, disabled && styles.disabled]}
          source={imageSource}
          resizeMode="contain"
        />
        <View>
          <Text
            style={[
              styles.targetTxt,
              styles.bottomMarg,
              disabled && styles.disabled,
            ]}>
            {title}
          </Text>
          <Text
            style={[Fonts.little, Fonts.light, disabled && styles.disabled]}>
            {subtitle}
          </Text>
          <Switch
            isSwitchOn={prioModeIsOn}
            customStyle={styles.switch}
            onToggleSwitch={val => {
              setPrioModeIsOn(val);
              setPriorityMode({
                variables: {
                  value: val ? priorityType : PRIORITY_MODE.filtration, // filtration is priority mode by default
                },
              });
            }}
            disabled={disabled}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  targetTxt: {
    ...Fonts.medium,
  },
  card: {
    paddingHorizontal: 23,
    paddingTop: 12,
    paddingBottom: 16,
    marginHorizontal: 30,
    marginTop: 35,
  },
  img: {
    height: 72,
    width: 72,
    marginRight: 20,
  },
  disabled: {
    tintColor: Colors.PALETTE_08_GREY_400,
    color: Colors.PALETTE_08_GREY_400,
    backgroundColor: Colors.PALETTE_08_GREY_200,
  },
  switch: {
    marginTop: 7,
    alignSelf: 'flex-start',
  },
  bottomMarg: {marginBottom: 7},
});
