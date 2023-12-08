/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {WebView} from 'react-native-webview';
import {ScrollView} from 'react-native-gesture-handler';
import {getBottomSpace} from 'react-native-iphone-x-helper';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';

export default function CustomBottomSheet({
  visible,
  setVisible,
  children,
  webUrl,
  customHeight,
}) {
  const [closed, setClosed] = useState(true);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (visible) {
      open();
    } else if (!closed) {
      close();
    }
  }, [visible]);

  function open() {
    bottomSheetRef.current.snapTo(0);
  }
  function close() {
    bottomSheetRef.current.snapTo(1);
  }

  function onClose() {
    setVisible(false);
    !closed && setClosed(true);
  }

  function onOpen() {
    closed && setClosed(false);
  }

  return (
    <>
      {visible ? (
        <View
          style={styles.full}
          onTouchEnd={() => {
            onClose();
            close();
          }}
        />
      ) : null}
      <BottomSheet
        initialSnap={1}
        ref={bottomSheetRef}
        snapPoints={[customHeight || '45%', '0%']}
        onCloseEnd={onClose}
        renderHeader={() => <View style={styles.barre} />}
        enabledContentGestureInteraction={
          !webUrl && children !== (undefined || null)
        }
        onOpenEnd={onOpen}
        renderContent={() =>
          // display children component if we have it, otherwise we display a webview
          children ? (
            <ScrollView contentContainerStyle={styles.container}>
              {children()}
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={[Alignments.fullSize, styles.round]}>
              <WebView source={{uri: webUrl}} />
            </ScrollView>
          )
        }
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20 + getBottomSpace(),
    minHeight: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  round: {borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden'},
  barre: {
    width: 80,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.PALETTE_08_GREY_050,
    ...Alignments.selfCenter,
    marginBottom: 6,
  },
  full: {
    backgroundColor: Colors.black50,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
