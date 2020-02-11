import {StyleSheet} from 'react-native';
import {white, red700} from './Colors';

const formStyles = StyleSheet.create({
  formView: {
    padding: 15,
  },
  textInput: {
    backgroundColor: white,
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 15,
    marginLeft: 5,
  },
  errorText: {
    fontWeight: 'bold',
    color: red700,
  },
});

export default formStyles;
