import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Linking} from 'react-native';
import {navigate} from '../navigation/NavigationService';
import {DYNAMIC_LINKS_REDIRECTIONS} from '../navigation/RoutesNames';

// import {navigatorRef} from './RootNavigator';

export async function dynamicLinksListnener() {
  await dynamicLinks()
    .getInitialLink()
    .then(link => {
      link && handleDynamicLink(link);
    });

  const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  // When the is component unmounted, remove the listener
  return () => unsubscribe();
}

export let orderIsLoading = false;

export async function handleDynamicLink(link) {
  console.log('==DYNAMIC LINK==>', link);

  if (
    link.url &&
    DYNAMIC_LINKS_REDIRECTIONS.find(item =>
      item?.link.includes(link.url?.split('?')?.[0] || link.url),
    )
  ) {
    const token = link.url.split('?token=')?.[1];
    const route = DYNAMIC_LINKS_REDIRECTIONS.find(item =>
      item?.link.includes(link.url?.split('?')?.[0] || link.url),
    )?.correspondingRoute;
    navigate(route, {token});
  }
}

async function testLink() {
  const link = await dynamicLinks().buildLink({
    link: 'https://desjoyaux.piscines/reset-password?token=testtoken',
    domainUriPrefix: 'https://desjoyaux.page.link',
    android: {
      packageName: 'com.desjoyaux.app',
    },
    ios: {
      bundleId: 'com.desjoyaux.app',
    },
  });
  Linking.openURL(link);
}
