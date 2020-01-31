import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const globalStyles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  colContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default globalStyles;
