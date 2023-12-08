import {gql} from '@apollo/client';

// TODO change serial !!! for all routes
const getManagement = gql`
  query {
    system(serial: "201") {
      serial
      devices {
        poolVolume
        management
        sensor
        group
        heatPump
        electrolyser
        projectors
        filtrationPump
      }
      common {
        priorityMode
      }
      weather {
        temp
        lux
      }
      water {
        temp {
          actualTemp
          targetTemp
          heatPumpStatus
        }
        quality {
          electrolyserStatus
          ph
          chlorine
          lastPhCalibration
          lastChlorineCalibration
        }
        filtration {
          filterCloggedPercentage
          status
          mode
          calendar {
            start
            end
            calendarType
          }
          stop1hState
          stop1hMinutesLeft
        }
        level
      }
      projectors {
        status
        timerStatus
        timerMinutes
        timerMinutesLeft
        duskStartStatus
        duskStartMinutes
        duskStartMinutesLeft
      }
      users {
        id
        userType
        firstname
        lastname
        mail
        phone
        lastConnectedUTC
        connectionsHistory {
          connectionTimeUTC
        }
        permissions {
          camera
          projector
          electrolyser
          heatPump
          filtration
        }
        notificationParameters {
          pushadviceStatus
          pushalertStatus
          pushfailureStatus
          smsadviceStatus
          smsalertStatus
          smsfailureStatus
          mailadviceStatus
          mailalertStatus
          mailfailureStatus
        }
      }
      dealer {
        id
        name
        address
        mail
        website
      }
      notifications {
        adviceNotifications {
          id
          code
          date
        }
        alertNotifications {
          id
          code
          date
        }
        failureNotifications {
          id
          code
          date
        }
      }
    }
  }
`;

const setHeatPumpStatus = gql`
  mutation setHeatPumpStatus($value: Boolean!) {
    setHeatPumpStatus(serial: "201", value: $value)
  }
`;

const setWaterTargetTemp = gql`
  mutation setWaterTargetTemp($value: Int!) {
    setWaterTargetTemp(serial: "201", value: $value)
  }
`;

const setPriorityMode = gql`
  mutation setPriorityMode($value: Int!) {
    setPriorityMode(serial: "201", value: $value)
  }
`;

const phCalibration = gql`
  mutation {
    phCalibration(serial: "201")
  }
`;

const chlorineCalibration = gql`
  mutation {
    chlorineCalibration(serial: "201")
  }
`;

const setElectrolyserStatus = gql`
  mutation setElectrolyserStatus($value: Boolean!) {
    setElectrolyserStatus(serial: "201", value: $value)
  }
`;

const setProjectorsStatus = gql`
  mutation setProjectorsStatus($value: Boolean!) {
    setProjectorsStatus(serial: "201", value: $value)
  }
`;

const setProjectorsDuskStartStatus = gql`
  mutation setProjectorsDuskStartStatus($value: Boolean!) {
    setProjectorsDuskStartStatus(serial: "201", value: $value)
  }
`;

const setFiltrationStatus = gql`
  mutation setFiltrationStatus($value: Boolean!) {
    setFiltrationStatus(serial: "201", value: $value)
  }
`;

const setCalendarCustom = gql`
  mutation setCalendarCustom($data: String!) {
    setCalendarCustom(serial: "201", value: $data)
  }
`;

const setFiltrationStop1h = gql`
  mutation setFiltrationStop1h($value: Boolean!) {
    setFiltrationStop1h(serial: "201", value: $value)
  }
`;

const deleteNotification = gql`
  mutation deleteNotification($type: String!, $id: ID!) {
    deleteNotification(
      serial: "201"
      notificationType: $type
      notificationId: $id
    )
  }
`;

const updateUserNotificationsPushParameters = gql`
  mutation updateUserNotificationsPushParameters(
    $userId: ID!
    $advice: Boolean!
    $alert: Boolean!
    $failure: Boolean!
  ) {
    updateUserNotificationsPushParameters(
      serial: "201"
      userId: $userId
      advice: $advice
      alert: $alert
      failure: $failure
    )
  }
`;

const updateUserNotificationsSMSParameters = gql`
  mutation updateUserNotificationsSMSParameters(
    $userId: ID!
    $advice: Boolean!
    $alert: Boolean!
    $failure: Boolean!
  ) {
    updateUserNotificationsSMSParameters(
      serial: "201"
      userId: $userId
      advice: $advice
      alert: $alert
      failure: $failure
    )
  }
`;

const updateUserNotificationsEmailParameters = gql`
  mutation updateUserNotificationsEmailParameters(
    $userId: ID!
    $advice: Boolean!
    $alert: Boolean!
    $failure: Boolean!
  ) {
    updateUserNotificationsEmailParameters(
      serial: "201"
      userId: $userId
      advice: $advice
      alert: $alert
      failure: $failure
    )
  }
`;

const getProjectorsModel = gql`
  query {
    modelsProjectors {
      id
      label
      colour
    }
  }
`;

const setProjectorsModel = gql`
  mutation setProjectorsModel($value: ID!) {
    setProjectorsModel(serial: "201", value: $value)
  }
`;

const getElectrolysersModel = gql`
  query {
    modelsElectrolyser {
      id
      label
    }
  }
`;

const setElectrolyserModel = gql`
  mutation setElectrolyserModel($value: ID!) {
    setElectrolyserModel(serial: "201", value: $value)
  }
`;

const getHeatPumpModels = gql`
  query {
    modelsHeatPump {
      id
      label
    }
  }
`;

const setHeatPumpModel = gql`
  mutation setHeatPumpModel($value: ID!) {
    setHeatPumpModel(serial: "201", value: $value)
  }
`;

const getFiltrationPumpModels = gql`
  query {
    modelsFiltrationPump {
      id
      label
    }
  }
`;

const setFiltrationPumpModel = gql`
  mutation setFiltrationPumpModel($value: ID!) {
    setFiltrationPumpModel(serial: "201", value: $value)
  }
`;

const updateUser = gql`
  mutation updateUser($userId: ID!, $phone: String!, $mail: String!) {
    updateUser(serial: "201", userId: $userId, phone: $phone, mail: $mail)
  }
`;

const createUser = gql`
  mutation createUser(
    $mail: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $permissions: String!
  ) {
    createUser(
      serial: "201"
      firstname: $firstname
      lastname: $lastname
      password: $password
      mail: $mail
      permissions: $permissions
    )
  }
`;

const deleteUser = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(serial: "201", userId: $userId)
  }
`;

const updateUserPassword = gql`
  mutation updateUserPassword(
    $userId: ID!
    $password: String!
    $oldPassword: String!
  ) {
    updateUserPassword(
      serial: "201"
      userId: $userId
      password: $password
      oldPassword: $oldPassword
    )
  }
`;

export default {
  getManagement,
  setHeatPumpStatus,
  setWaterTargetTemp,
  setPriorityMode,
  phCalibration,
  chlorineCalibration,
  setElectrolyserStatus,
  setProjectorsStatus,
  setProjectorsDuskStartStatus,
  setFiltrationStatus,
  setCalendarCustom,
  setFiltrationStop1h,
  deleteNotification,
  updateUserNotificationsPushParameters,
  updateUserNotificationsSMSParameters,
  updateUserNotificationsEmailParameters,
  getProjectorsModel,
  setProjectorsModel,
  getElectrolysersModel,
  setElectrolyserModel,
  getHeatPumpModels,
  setHeatPumpModel,
  getFiltrationPumpModels,
  setFiltrationPumpModel,
  updateUser,
  createUser,
  deleteUser,
  updateUserPassword,
};
