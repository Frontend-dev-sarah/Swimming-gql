import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {List, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'i18n-js';
import {BleManager, ScanCallbackType, ScanMode} from 'react-native-ble-plx';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import CustomButton from '../Button/CustomButton';
import {screenWidth} from '../../utils/constants';

// use class component, otherwise it does not work
export default class Ble_test extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      scanning: false,
      devices: [],
      BLEAuthorized: false,
      BLEActivated: false,
      selectedDevice: null,
    };
  }

  checkBleActivated = async () => {
    const initialState = await this.manager.state();
    if (initialState === 'PoweredOn') {
      this.setState({BLEActivated: true});
    } else if (initialState === 'Unauthorized') {
      Alert.alert(I18n.t('pairing.hasToAuthorizeBluetooth'), '', [
        {
          text: I18n.t('app.ok'),
          onPress: () => {
            this.props.setOpen(false);
            this.onCloseBottomSheet();
          },
        },
      ]);
    }
    this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        this.setState({BLEActivated: true});
      } else if (initialState === 'Unauthorized') {
        this.setState({BLEActivated: false});
        this.manager.stopDeviceScan();
        Alert.alert('', I18n.t('pairing.hasToAuthorizeBluetooth'), [
          {
            text: I18n.t('app.ok'),
            onPress: () => {
              this.props.setOpen(false);
              this.onCloseBottomSheet();
            },
          },
        ]);
      } else {
        this.setState({BLEActivated: false});
        this.manager.stopDeviceScan();
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps?.open !== this.props.open && this.props.open) {
      this.checkBluetoothPermission();
      this.checkBleActivated();
    } else if (prevProps?.open !== this.props.open && !this.props.open) {
      this.onCloseBottomSheet();
    }
    if (
      (prevState?.BLEActivated !== this.state.BLEActivated ||
        prevState?.BLEAuthorized !== this.state.BLEAuthorized) &&
      (this.state.BLEActivated || Platform.OS === 'android') &&
      this.state.BLEAuthorized &&
      this.props.open
    ) {
      this.scanBluetoothDevices();
    }
  }

  onCloseBottomSheet() {
    this.manager.stopDeviceScan();
    this.setState({scanning: false, BLEAuthorized: false, BLEActivated: false});
  }

  checkBluetoothPermission() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          this.setState({BLEAuthorized: true});
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: I18n.t('pairing.titlePermission'),
              message: I18n.t('pairing.messagePermission'),
              buttonNeutral: I18n.t('app.later'),
              buttonNegative: I18n.t('app.cancel'),
              buttonPositive: I18n.t('app.ok'),
            },
          ).then(result => {
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
              this.setState({BLEAuthorized: true});
            } else {
            }
          });
        }
      });
    } else if (Platform.OS === 'ios') {
      this.setState({BLEAuthorized: true}); // ios does not need permission
    }
  }

  scanBluetoothDevices() {
    this.setState({scanning: true});
    const tmpDevicesList = [...this.state.devices];
    this.manager.startDeviceScan(
      null,
      {
        allowDuplicates: true,
        callbackType: ScanCallbackType.AllMatches,
        scanMode: ScanMode.Balanced,
      },
      async (error, device) => {
        if (error) {
          //handle errors
          if (error?.message?.includes('is powered off')) {
            if (Platform.OS === 'ios') {
              Alert.alert(I18n.t('pairing.hasToActivateBluetooth'), [
                {
                  text: I18n.t('app.ok'),
                  onPress: () => null,
                },
              ]);
            } else if (Platform.OS === 'android') {
              this.manager.enable(); // works only on android
            }
          }
          this.manager.stopDeviceScan();
          this.setState({scanning: false});
          return;
        }
        if (
          device?.name != null &&
          !tmpDevicesList.find(item => item.id === device.id)
        ) {
          // we update devices only if different
          this.setState({
            devices: [...tmpDevicesList, device],
          });
          tmpDevicesList.push(device);
        }
      },
    );
  }

  selectDevice(device) {
    this.manager.stopDeviceScan();
    this.setState({selectedDevice: device, scanning: false});
  }

  renderDevicesList() {
    return (
      <>
        <ScrollView>
          {this.state.devices.map(item => {
            return (
              <List.Item
                key={item?.id?.toString()}
                onPress={() => this.selectDevice(item)}
                title={item.name}
                left={() => (
                  <MaterialCommunityIcons
                    name="wifi"
                    size={32}
                    style={Alignments.selfCenter}
                    color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
                  />
                )}
                titleStyle={styles.item}
              />
            );
          })}
        </ScrollView>
        <CustomButton
          text={I18n.t('app.back')}
          textMode
          customStyle={styles.btn}
          onPress={() => {
            this.props.setOpen(false);
            this.onCloseBottomSheet();
          }}
        />
      </>
    );
  }

  renderConfirmation() {
    return (
      <>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={screenWidth * 0.3}
          style={styles.validated}
          color={Colors.LAGOON_DARK}
        />
        <Text style={[Alignments.selfCenter, {marginBottom: 24}]}>
          {I18n.t('pairing.pairingSuccess')}
        </Text>
        <CustomButton
          text={I18n.t('app.finish')}
          onPress={() => {
            this.props.setOpen(false);
            this.onCloseBottomSheet();
          }}
        />
      </>
    );
  }

  render() {
    return (
      <>
        <View style={Alignments.rowCross}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={Colors.PRIMARY}
          />
          <Text style={styles.title}>{I18n.t('pairing.cardPairing')}</Text>
          {this.state.scanning ? (
            <ActivityIndicator
              size={20}
              color={Colors.black}
              style={styles.loader}
            />
          ) : null}
        </View>
        {this.state?.selectedDevice
          ? this.renderConfirmation()
          : this.renderDevicesList()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {marginLeft: 15, fontSize: 24, ...Fonts.light, marginBottom: 16},
  item: {marginLeft: 15},
  loader: {marginLeft: 'auto'},
  btn: {alignSelf: 'flex-start'},
  validated: {...Alignments.selfCenter, marginVertical: 24},
});
