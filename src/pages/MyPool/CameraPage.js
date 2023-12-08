import React, {useEffect, useState, useCallback} from 'react';
import {RTCView, mediaDevices} from 'react-native-webrtc';
import {Platform, StyleSheet, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import I18n from 'i18n-js';

import Alignments from '../../theme/Alignments';
import {screenHeight, screenWidth} from '../../utils/constants';
import {IconButton} from 'react-native-paper';
import Colors from '../../theme/Colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {useIsFocused} from '@react-navigation/native';
import CustomButton from '../../components/Button/CustomButton';

export default function CameraPage({navigation}) {
  const isFocused = useIsFocused();
  const [streamUrl, setStreamUrl] = useState(null);
  const [displayPiloting, setDisplayPiloting] = useState(false);
  const [cameraIsOn, setCameraIsOn] = useState(true); // todo replace by value of api

  useEffect(() => {
    if (isFocused) {
      Orientation.lockToLandscape(); // lock to portrait when open page
    } else {
      Orientation.lockToPortrait(); // lock to landscape when quit page
    }
  }, [isFocused]);

  useEffect(() => {
    __DEV__ && Platform.OS === 'android' && getLocalStream();
  }, []);

  // get localstream to test rtc while we don't have streamUrl
  // remove in production
  function getLocalStream() {
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == 'environment'
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: screenWidth,
            height: screenHeight,
            frameRate: 30,
            facingMode: 'environment',
            deviceId: videoSourceId,
          },
        })
        .then(stream => {
          setStreamUrl(stream?.toURL());
        })
        .catch(error => {
          //
        });
    });
  }

  function renderDirections() {
    return (
      <>
        <View style={styles.directions}>
          <IconButton
            icon="chevron-up"
            color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
            size={24}
            style={[styles.icon, styles.chevronUp]}
            onPress={() => null}
          />
          <IconButton
            icon="chevron-left"
            color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
            size={24}
            style={[styles.icon, styles.chevronLeft]}
            onPress={() => null}
          />
          <IconButton
            icon="chevron-right"
            color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
            size={24}
            style={[styles.icon, styles.chevronRight]}
            onPress={() => null}
          />
          <IconButton
            icon="chevron-down"
            color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
            size={24}
            style={[styles.icon]}
            onPress={() => null}
          />
        </View>
        <CustomButton
          text={I18n.t('app.validate')}
          onPress={() => setDisplayPiloting(false)}
          icon={'check'}
          customStyle={styles.btn}
        />
      </>
    );
  }

  function renderInitialCommands() {
    return (
      <View style={styles.initialCommands}>
        {cameraIsOn ? (
          <IconButton
            icon="arrow-all"
            color={Colors.white}
            size={24}
            style={[styles.iconPrimary]}
            onPress={() => setDisplayPiloting(true)}
          />
        ) : null}
        <CustomButton
          text={cameraIsOn ? I18n.t('app.switchOff') : I18n.t('app.switchOn')}
          onPress={() => setCameraIsOn(!cameraIsOn)}
          icon={cameraIsOn ? 'stop' : 'check'}
          red={cameraIsOn}
          green={!cameraIsOn}
        />
      </View>
    );
  }

  return (
    <>
      <RTCView
        style={styles.cameraView}
        streamURL={streamUrl}
        objectFit="cover"
      />
      <View style={styles.container}>
        <IconButton
          icon="arrow-left"
          color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
          size={24}
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <View style={[Alignments.rowBetween]}>
          {displayPiloting ? (
            <View style={styles.leftBottomView}>
              <IconButton
                icon="plus"
                color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
                size={24}
                style={styles.icon}
                onPress={() => null}
              />
              <IconButton
                icon="minus"
                color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
                size={24}
                style={styles.icon}
                onPress={() => null}
              />
            </View>
          ) : null}
          <View style={styles.rightBottomView}>
            {displayPiloting ? renderDirections() : renderInitialCommands()}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Alignments.fill,
    paddingHorizontal: 31,
    paddingBottom: 31,
    paddingTop: getStatusBarHeight(),
    justifyContent: 'space-between',
  },
  cameraView: {
    backgroundColor: Colors.PALETTE_08_GREY_100,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  icon: {
    backgroundColor: Colors.white,
  },
  iconPrimary: {
    backgroundColor: Colors.PRIMARY,
    marginRight: 20,
  },
  rightBottomView: {marginLeft: 'auto', paddingHorizontal: 10},
  chevronUp: {
    marginBottom: 20,
  },
  chevronRight: {
    position: 'absolute',
    right: -22,
    top: 30,
  },
  chevronLeft: {position: 'absolute', left: -22, top: 30},
  directions: {
    ...Alignments.selfCenter,
    width: 36 + 30, // 36 is the width/height of IconButton
    ...Alignments.center,
  },
  btn: {
    marginTop: 15,
  },
  leftBottomView: {
    alignSelf: 'flex-end',
  },
  initialCommands: {
    ...Alignments.row,
  },
});
