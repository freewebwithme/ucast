import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import LogInScreen from "../screens/LogInScreen";
import LandingScreen from "../screens/LandingScreen";
import {
  SignUpScreen,
  StepTwoScreen,
  StepThreeScreen,
  StepFourScreen
} from "../screens/SignUpScreen";

const config = {
  headerMode: "none"
};

const LandingStack = createStackNavigator(
  {
    Landing: LandingScreen,
    Login: LogInScreen,
    SignUp: SignUpScreen,
    StepTwo: StepTwoScreen,
    StepThree: StepThreeScreen,
  },
  config
);

export { LandingStack };
