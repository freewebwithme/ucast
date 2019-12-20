import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import tabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  Main: tabNavigator,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, {history: 'hash'});
