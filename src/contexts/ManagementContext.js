import React, {useState, createContext, useEffect} from 'react';

import i18n from '../utils/localization/I18n';
import ManagementApi from '../api/GQL/ManagementApi';
import {useLazyQuery, useMutation} from '@apollo/client';
import {useContext} from 'react';
import UserContext from './UserContext';
import {errorAlert} from '../utils/Alert/errorAlert';

const ManagementContext = createContext();

export function ManagementProvider(props) {
  const {authToken, logout} = useContext(UserContext);
  const NOTIFICATION_TYPE = {
    seeAll: i18n.t('notifications.seeAll'),
    failure: i18n.t('notifications.failure'),
    alert: i18n.t('notifications.alert'),
    advice: i18n.t('notifications.advice'),
  };

  // gql
  const [
    getManagementInfos,
    {called, loading: getManagementInfosLoading, data, variables},
  ] = useLazyQuery(ManagementApi.getManagement, {
    fetchPolicy: 'cache-and-network', // important! otherwise data is not refreshed when called second time
    onError: ({networkError}, cb) => {
      if (networkError && networkError.statusCode === 401) {
        // if token is expired we logout user
        logout();
      }
    },
  });

  const [setCalendarCustom, {loading: setCalendarCustomLoading}] = useMutation(
    ManagementApi.setCalendarCustom,
    {
      onCompleted({setCalendarCustom: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError({networkError}) {
        return errorAlert();
      },
    },
  );

  const [customCalendar, setCustomCalendar] = useState([]);

  useEffect(() => {
    authToken && getManagementInfos();
  }, [authToken]);

  useEffect(() => {
    if (data?.system?.water?.filtration?.calendar) {
      setCustomCalendar(data?.system?.water?.filtration?.calendar);
    }
  }, [data?.system?.water?.filtration?.calendar]);

  // this useEffect will update api each time we change hours of custom calendar
  useEffect(() => {
    if (
      customCalendar?.length &&
      data?.system?.water?.filtration?.calendar &&
      customCalendar !== data?.system?.water?.filtration?.calendar
    ) {
      setCalendarCustom({
        variables: {
          data: JSON.stringify({
            mode: 'custom',
            value: customCalendar.reduce((res, item) => {
              if (item && item?.start !== null && item?.end !== null) {
                res.push({
                  start: item.start,
                  end: item?.end,
                  calendarType: 1,
                });
              }
              return res;
            }, []),
          }),
        },
      });
    }
  }, [customCalendar]);

  return (
    <ManagementContext.Provider
      value={{
        getManagementInfosLoading,
        dealer: data?.system?.dealer,
        weather: data?.system?.weather,
        water: data?.system?.water,
        projectors: data?.system?.projectors,
        getManagementInfos,
        priorityMode: data?.system?.common?.priorityMode,
        customCalendar,
        setCustomCalendar,
        notifications: data?.system?.notifications,
        NOTIFICATION_TYPE,
        users: data?.system?.users,
        devices: data?.system?.devices,
      }}>
      {props.children}
    </ManagementContext.Provider>
  );
}

export default ManagementContext;
