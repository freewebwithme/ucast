import color from 'color';
import {white, black, pinkA400} from './Colors';
import {DefaultTheme} from 'react-native-paper';

const CustomTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#f6f6f6",
    surface: white,
    error: "#B00020",
    text: black,
    onBackground: "#000000",
    onSurface: "#000000",
    disabled: color(black)
      .alpha(0.20)
      .rgb()
      .string(),
    placeholder: color(black)
      .alpha(0.54)
      .rgb()
      .string(),
    backdrop: color(black)
      .alpha(0.5)
      .rgb()
      .string(),
    notification: pinkA400
  },
  fonts: {...DefaultTheme.fonts}, 
  animation: {
    scale: 1.0
  }
};

export default CustomTheme;
