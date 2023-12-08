import {useMutation} from '@apollo/client';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import {Card, Text} from 'react-native-paper';
import I18n from 'i18n-js';
import ManagementApi from '../../api/GQL/ManagementApi';
import CustomBottomSheet from '../../components/BottomSheet/CustomBottomSheet';
import InfoButton from '../../components/BottomSheet/InfoButton';
import Switch from '../../components/Switch/Switch';
import ManagementContext from '../../contexts/ManagementContext';
import Alignments from '../../theme/Alignments';
import Fonts from '../../theme/Fonts';
import {errorAlert} from '../../utils/Alert/errorAlert';
import RunningStateIndicator from '../../components/RunningState/RunningStateIndicator';
import CustomButton from '../../components/Button/CustomButton';
import AppImage from '../../utils/AppImage';
import CustomShip from '../../components/Chip/CustomShip';

export default function ProjectorsPage({navigation}) {
  const {projectors, getManagementInfos} = useContext(ManagementContext);
  const [infosVisible, setInfosVisible] = useState(false);
  const [isOn, setIsOn] = useState(projectors?.status);
  const [isDuskOn, setIsDuskOn] = useState(projectors?.duskStartStatus);
  const [timerSelectedValue, setTimerSelectedValue] = useState(
    projectors?.timerMinutes,
  );
  const [timerDuskSelectedValue, setTimerDuskSelectedValue] = useState(
    projectors?.duskStartMinutes,
  );

  useEffect(() => {
    if (projectors?.status && !isOn) {
      setIsOn(true);
    } else if (isOn && !projectors?.status) {
      setIsOn(false);
    }
  }, [projectors?.status]);

  useEffect(() => {
    if (projectors?.duskStartStatus && !isDuskOn) {
      setIsDuskOn(true);
    } else if (isDuskOn && !projectors?.duskStartStatus) {
      setIsDuskOn(false);
    }
  }, [projectors?.duskStartStatus]);

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
  const [setProjectorsDuskStartStatus] = useMutation(
    ManagementApi.setProjectorsDuskStartStatus,
    {
      onCompleted({setProjectorsDuskStartStatus: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        // if error we reset switch value to real data
        setIsDuskOn(!isDuskOn);
        return errorAlert();
      },
    },
  );

  // bottom sheet
  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <InfoButton visible={infosVisible} setVisible={setInfosVisible} />
      ),
    });
  }, [infosVisible, setInfosVisible, navigation]);

  function bottemSheetContent() {
    return (
      <Text style={Fonts.textBlack}>{'informations sur les projecteurs'}</Text>
    );
  }

  function renderProjectorCard() {
    return (
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>
          {I18n.t('projectors.poolLighting')}
        </Text>
        <View
          style={[Alignments.rowCenter, Alignments.fill, {marginBottom: 20}]}>
          <Text style={styles.option}>{I18n.t('projectors.off')}</Text>
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
          <Text style={styles.option}>{I18n.t('projectors.on')}</Text>
        </View>
        <RunningStateIndicator
          item={I18n.t('projectors.lighting')}
          running={isOn}
        />
      </Card>
    );
  }

  function renderTimerCard() {
    return (
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{I18n.t('projectors.timer')}</Text>
        <View style={[Alignments.rowCenter]}>
          {[60, 120, 180].map((value, index) => {
            return (
              <CustomShip
                key={index?.toString()}
                text={`${value / 60} h`}
                isSelected={
                  timerSelectedValue && timerSelectedValue / 60 === index + 1
                }
                onPress={() =>
                  setTimerSelectedValue(
                    timerSelectedValue === value ? null : value,
                  )
                }
                disabled={!isOn}
              />
            );
          })}
        </View>
        <View style={styles.timerBottom}>
          <CustomButton
            text={
              projectors?.timerStatus
                ? I18n.t('app.cancel')
                : I18n.t('app.start')
            }
            onPress={() => console.log('todo')}
            icon={projectors?.timerStatus ? 'stop' : 'play'}
            red={projectors?.timerStatus}
            mode={projectors?.timerStatus ? 'outlined' : 'contained'}
            customStyle={styles.timerBtn}
          />
          <Text>(1:45:29)</Text>
        </View>
      </Card>
    );
  }

  function renderDuskCard() {
    return (
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>
          {I18n.t('projectors.duskLighting')}
        </Text>
        <Switch
          isSwitchOn={isDuskOn}
          customStyle={[styles.switch2]}
          onToggleSwitch={() => {
            setIsDuskOn(!isDuskOn);
            setProjectorsDuskStartStatus({
              variables: {
                value: !isDuskOn,
              },
            });
          }}
        />
        <Text style={[Fonts.light, Fonts.little, Alignments.selfCenter]}>
          {I18n.t('projectors.duskTimer')}
        </Text>
        <View style={[Alignments.rowCenter, styles.timerBottom]}>
          {[0, 60, 120, 180].map((value, index) => {
            return (
              <CustomShip
                text={!value ? I18n.t('projectors.noLimit') : `${value / 60} h`}
                isSelected={
                  timerDuskSelectedValue !== (null || undefined) &&
                  timerDuskSelectedValue / 60 === index
                }
                onPress={() =>
                  setTimerDuskSelectedValue(
                    timerDuskSelectedValue === value ? null : value,
                  )
                }
                disabled={!isDuskOn}
                key={index?.toString()}
              />
            );
          })}
        </View>
      </Card>
    );
  }

  return (
    <>
      <ScrollView style={[Alignments.fill, styles.container]}>
        {renderProjectorCard()}
        {renderTimerCard()}
        {renderDuskCard()}
        <Text style={styles.cardTitle}>{I18n.t('projectors.colors')}</Text>
        <CustomButton
          text={I18n.t('projectors.changeColor')}
          onPress={() => console.log('todo')}
          customStyle={[Alignments.selfStretch]}
        />
        <CustomButton
          text={I18n.t('projectors.sync')}
          onPress={() => console.log('todo')}
          customStyle={[Alignments.selfStretch, styles.status]}
          icon="sync"
        />
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
  container: {
    paddingHorizontal: 30,
    paddingTop: 9,
    paddingBottom: 32,
  },
  switch: {
    marginHorizontal: 4,
  },
  switch2: {...Alignments.selfCenter, marginBottom: 12},
  option: {
    ...Fonts.light,
    ...Fonts.medium,
  },
  card: {elevation: 1, padding: 16, marginBottom: 16, ...Alignments.mainCenter},
  cardTitle: {
    ...Alignments.selfCenter,
    ...Fonts.medium,
    marginBottom: 20,
  },
  status: {
    marginTop: 20,
  },
  timerBtn: {
    marginRight: 16,
  },
  timerBottom: {
    ...Alignments.rowCenter,
    marginTop: 16,
  },
});
