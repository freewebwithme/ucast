import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const globalStyles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default globalStyles;
