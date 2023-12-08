import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import I18n from 'i18n-js';
import moment from 'moment';

import ManagementContext from '../../contexts/ManagementContext';
import {DataTable} from 'react-native-paper';

export default function ConnectionsHistoryPage() {
  const {users} = useContext(ManagementContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    formatHistory();
  }, [users]);

  function formatHistory() {
    let data;
    if (users?.length) {
      data = users.reduce((res, user) => {
        if (user && user?.connectionsHistory?.length) {
          user.connectionsHistory.map(h =>
            res.push({userName: user?.firstname, date: h?.connectionTimeUTC}),
          );
        }
        return res;
      }, []);
      data = data?.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime(); // sort by date
      });
      setHistory(data);
    }
  }

  function renderRow({userName, date, key}) {
    return (
      <DataTable.Row key={key}>
        <DataTable.Cell>{userName}</DataTable.Cell>
        <DataTable.Cell numeric>
          {moment(date).format('DD/MM/YYYY')}
        </DataTable.Cell>
        <DataTable.Cell numeric>{moment(date).format('hh:mm')}</DataTable.Cell>
      </DataTable.Row>
    );
  }

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{I18n.t('history.user')}</DataTable.Title>
          <DataTable.Title numeric>{I18n.t('history.date')}</DataTable.Title>
          <DataTable.Title numeric>{I18n.t('history.hour')}</DataTable.Title>
        </DataTable.Header>
        {history?.map((h, index) =>
          renderRow({userName: h?.userName, date: h?.date, key: index}),
        )}
      </DataTable>
    </ScrollView>
  );
}
