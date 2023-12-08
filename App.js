import 'react-native-gesture-handler';
import App from './src/AppContainer';
import {Sentry} from 'react-native-sentry';
import {glitchDSN} from './src/utils/constants';

Sentry.config(glitchDSN).install();

export default App;
