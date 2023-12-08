const RoutesNames = {
  LoginPage: 'LoginPage',
  BottomTab: 'BottomTab',
  MyPool: 'MyPool',
  Profile: 'Profile',
  Notifications: 'Notifications',
  Menu: 'Menu',
  WaterTemperaturePage: 'WaterTemperaturePage',
  FiltrationStatPage: 'FiltrationStatPage',
  FiltrationPage: 'FiltrationPage',
  CumulativeStatsPage: 'CumulativeStatsPage',
  StatsMenuPage: 'StatsMenuPage',
  WaterQualityPage: 'WaterQualityPage',
  ProjectorsPage: 'ProjectorsPage',
  CameraPage: 'CameraPage',
  AppParamsPage: 'AppParamsPage',
  PriorityModePage: 'PriorityModePage',
  PoolParamsPage: 'PoolParamsPage',
  ConnectionsHistoryPage: 'ConnectionsHistoryPage',
  EditPasswordPage: 'EditPasswordPage',
  AddProfilePage: 'AddProfilePage',
  DealerPage: 'DealerPage',
  OtherProfilePage: 'OtherProfilePage',
  ForgotPasswordPage: 'ForgotPasswordPage',
  ResetPasswordPage: 'ResetPasswordPage',
};

export const DYNAMIC_LINKS_REDIRECTIONS = [
  {
    link: 'https://desjoyaux.piscines/reset-password',
    correspondingRoute: RoutesNames.ResetPasswordPage,
  },
];

export default RoutesNames;
