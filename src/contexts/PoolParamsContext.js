import React, {createContext, useEffect, useContext} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';

import ManagementApi from '../api/GQL/ManagementApi';
import UserContext from './UserContext';
import {errorAlert} from '../utils/Alert/errorAlert';
import ManagementContext from './ManagementContext';

// this context is used to centralize all pool parameters and requests that concern these params
const PoolParamsContext = createContext();

export function PoolParamsProvider(props) {
  const {authToken} = useContext(UserContext);
  const {getManagementInfos} = useContext(ManagementContext);

  // gql
  const [getProjectorsModel, {data: projectorModels}] = useLazyQuery(
    ManagementApi.getProjectorsModel,
    {fetchPolicy: 'cache-and-network'},
  );
  const [setProjectorsModel, {loading: setProjectorsModelLoading}] =
    useMutation(ManagementApi.setProjectorsModel, {
      onCompleted({setProjectorsModel: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    });

  const [getElectrolysersModel, {data: electrolyserModels}] = useLazyQuery(
    ManagementApi.getElectrolysersModel,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const [setElectrolyserModel, {loading: setElectrolyserModelLoading}] =
    useMutation(ManagementApi.setElectrolyserModel, {
      onCompleted({setElectrolyserModel: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    });

  const [getHeatPumpModels, {data: heatPumpModels}] = useLazyQuery(
    ManagementApi.getHeatPumpModels,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const [setHeatPumpModel, {loading: setHeatPumpModelLoading}] = useMutation(
    ManagementApi.setHeatPumpModel,
    {
      onCompleted({setHeatPumpModel: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    },
  );

  const [getFiltrationPumpModels, {data: filtrationPumpModels}] = useLazyQuery(
    ManagementApi.getFiltrationPumpModels,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const [setFiltrationPumpModel, {loading: setFiltrationPumpModelLoading}] =
    useMutation(ManagementApi.setFiltrationPumpModel, {
      onCompleted({setFiltrationPumpModel: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    });

  useEffect(() => {
    getDevicesModels();
  }, [authToken]);

  function getDevicesModels() {
    getProjectorsModel();
    getElectrolysersModel();
    getHeatPumpModels();
    getFiltrationPumpModels();
  }

  return (
    <PoolParamsContext.Provider
      value={{
        projectorModels: projectorModels?.modelsProjectors,
        setProjectorsModel,
        setProjectorsModelLoading,
        electrolyserModels: electrolyserModels?.modelsElectrolyser,
        setElectrolyserModel,
        setElectrolyserModelLoading,
        heatPumpModels: heatPumpModels?.modelsHeatPump,
        setHeatPumpModel,
        setHeatPumpModelLoading,
        filtrationPumpModels: filtrationPumpModels?.modelsFiltrationPump,
        setFiltrationPumpModel,
        setFiltrationPumpModelLoading,
      }}>
      {props.children}
    </PoolParamsContext.Provider>
  );
}

export default PoolParamsContext;
