import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import RoutesNames from '../../navigation/RoutesNames';
import Alignments from '../../theme/Alignments';

import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {screenWidth} from '../../utils/constants';

export default function UserCard({user, customStyle}) {
  const navigation = useNavigation();

  function onPressCard() {
    navigation.navigate(RoutesNames.OtherProfilePage, {user});
  }

  return (
    <Card style={[styles.container, customStyle]} onPress={onPressCard}>
      {user?.firstname ? (
        <Avatar.Text
          labelStyle={styles.label}
          size={35}
          label={user.firstname.charAt(0)}
          style={styles.avatar}
        />
      ) : null}
      <Text numberOfLines={2} style={Alignments.textCenter}>
        {user?.firstname}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 40,
    backgroundColor: Colors.white,
    width: screenWidth * 0.25,
    ...Alignments.center,
  },
  label: {
    ...Fonts.uppercase,
  },
  avatar: {
    ...Alignments.selfCenter,
    marginBottom: 10,
  },
});
