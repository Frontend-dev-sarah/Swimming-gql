import React, {useContext, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import I18n from 'i18n-js';
import * as Yup from 'yup';
import {Avatar, Card, Text} from 'react-native-paper';

import AppStyle from '../../theme/AppStyle';
import ManagementContext from '../../contexts/ManagementContext';
import UserCard from '../../components/Cards/UserCard';
import AddUserCard from '../../components/Cards/AddUserCard';
import CustomButton from '../../components/Button/CustomButton';
import RoutesNames from '../../navigation/RoutesNames';
import FormView from '../../components/formik/FormView';
import Form from '../../components/formik/Form';
import TextField from '../../components/formik/TextField';
import Colors from '../../theme/Colors';
import Alignments from '../../theme/Alignments';

const phoneRegExp = /^(33|0)(1|2|3|4|5|6|7|9)\d{8}$/;

const schema = Yup.object().shape({
  firstname: Yup.string().required(I18n.t('error.notBlankFirstname')),
  lastname: Yup.string().required(I18n.t('error.notBlankLastname')),
  mail: Yup.string()
    .email(I18n.t('error.notValidEmail'))
    .required(I18n.t('error.notBlankEmail')),
  phone: Yup.string()
    .matches(phoneRegExp, I18n.t('error.notValidPhone'))
    .required(I18n.t('error.notBlankPhone')),
});

export default function ProfilePage({navigation}) {
  const {users} = useContext(ManagementContext);
  const initialValues = {
    firstname: '',
    lastname: '',
    mail: '',
    phone: '',
  };

  // inputs refs
  const lastnameRef = useRef();
  const mailRef = useRef();
  const phoneRef = useRef();

  function submit(values) {
    console.log('todo', values);
  }

  return (
    <FormView>
      <Form
        onSubmit={submit}
        initialValues={initialValues}
        schema={schema}
        submitOnChange
        style={styles.form}>
        <>
          <Avatar.Text
            labelStyle={styles.label}
            size={50}
            label={'T'}
            style={styles.avatar}
          />
          <View style={styles.paddingView}>
            <Text>{I18n.t('pages.profile')}</Text>
            <Card style={styles.card}>
              <TextField
                name="firstname"
                label={I18n.t('profile.firstname')}
                helperText={I18n.t('profile.firstnameInfo')}
                onSubmitEditing={() => lastnameRef?.current?.focus()}
              />
              <TextField
                innerRef={lastnameRef}
                name="lastname"
                label={I18n.t('profile.lastname')}
                onSubmitEditing={() => mailRef?.current?.focus()}
              />
              <TextField
                name="password"
                label={I18n.t('profile.password')}
                secureTextEntry
                disabled
                fakeValue="--------"
              />
              <CustomButton
                text={I18n.t('profile.editPassword')}
                textMode
                style={styles.editPassword}
                onPress={() =>
                  navigation.navigate(RoutesNames.EditPasswordPage)
                }
              />
            </Card>
            <Text>{I18n.t('profile.myCoordinates')}</Text>
            <Card style={styles.card}>
              <TextField
                innerRef={mailRef}
                name="mail"
                keyboardType="email-address"
                label={I18n.t('profile.mail')}
                onSubmitEditing={() => phoneRef?.current?.focus()}
              />
              <TextField
                innerRef={phoneRef}
                name="phone"
                keyboardType="phone-pad"
                label={I18n.t('profile.phone')}
              />
            </Card>
          </View>
          <View style={styles.paddingView}>
            <Text>{I18n.t('profile.management')}</Text>
          </View>
          <FlatList
            horizontal
            data={users}
            renderItem={({item}) => <UserCard user={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={styles.flatlist}
            ListFooterComponent={() => <AddUserCard />}
            ListFooterComponentStyle={{paddingEnd: 31}}
          />
          <CustomButton
            text={I18n.t('profile.connectionsHistory')}
            textMode
            style={styles.btn}
            onPress={() =>
              navigation.navigate(RoutesNames.ConnectionsHistoryPage)
            }
          />
        </>
      </Form>
    </FormView>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: 10,
  },
  paddingView: {paddingHorizontal: 31},
  flatlist: {
    marginTop: 15,
    paddingStart: 31,
  },
  btn: {
    marginHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  editPassword: {
    alignSelf: 'flex-start',
    marginTop: -15,
    marginLeft: -15,
  },
  form: {
    paddingHorizontal: 0,
    ...AppStyle.safeContainer,
    paddingBottom: 25,
  },
  card: {
    padding: 20,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: Colors.white,
    zIndex: 10,
  },
  avatar: {
    marginVertical: 25,
    ...Alignments.selfCenter,
  },
});
