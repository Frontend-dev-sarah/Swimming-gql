import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidVisibility,
  AndroidImportance,
} from '@notifee/react-native';
import {Platform} from 'react-native';

export async function getFcmToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('===fcm token===>', fcmToken);
    return fcmToken;
  } else {
    console.log('===fcm token failed===>');
  }
}

export async function registerNotifications() {
  const token = await checkPermission();
  if (token && typeof token === 'string') {
    // UserApi.registerFCMToken(token); TODO send fcm to api
  }
}

export async function checkPermission() {
  const enabled = await messaging().hasPermission();
  await notifee.createChannelGroup({
    id: 'desjoyaux',
    name: 'desjoyaux',
  });
  await notifee.createChannel({
    name: 'desjoyaux',
    groupId: 'desjoyaux',
    id: 'desjoyaux',
    sound: 'default',
    visibility: AndroidVisibility.PUBLIC,
    importance: AndroidImportance.HIGH,
  });

  if (enabled && enabled !== -1) {
    notificationListener();
    return getFcmToken();
  } else {
    return requestPermission();
  }
}

export async function requestPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Notifications Authorization status:', authStatus);
  }
  return true;
}

export async function notificationListener() {
  messaging().onMessage(remoteMessage => {
    console.log('==Notification received when app opened', remoteMessage);
    displayNotif(remoteMessage);
    checkNotification(remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      '==Notification caused app to open from background state:',
      remoteMessage,
    );
    checkNotification(remoteMessage);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          '==Notification caused app to open from quit state:',
          remoteMessage,
        );
        checkNotification(remoteMessage);
      }
    });
}

async function displayNotif(remoteMessage) {
  remoteMessage &&
    remoteMessage.notification &&
    (await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      ...(Platform.OS === 'android' && {
        android: {
          channelId: 'desjoyaux',
          groupId: 'desjoyaux',
          smallIcon: 'appiconround',
        },
      }),
    }));
}

export async function checkNotification(remoteMessage) {
  // do whatever
  console.log('==CHECK NOTIFICATION==>', remoteMessage);
}

export default {
  registerNotifications,
  checkPermission,
  requestPermission,
};
