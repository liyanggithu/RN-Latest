import { StyleSheet, PixelRatio, Dimensions } from "react-native";
import configStore from "stores/configStore";
const pixelRatio = PixelRatio.get();
let { width, height } = Dimensions.get("window");

function getAdaptation(num) {
  let unitWidth = width / configStore.designWidth; // 750 => UI设计图的宽度
  return parseFloat((num * unitWidth).toFixed(2));
}

let styles = {
  container: {
    width: "100%",
    backgroundColor: "#fff"
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    color: "#ffffff",
    backgroundColor: "transparent",
    marginTop: getAdaptation(11),
    marginBottom: getAdaptation(11),
    marginRight: getAdaptation(11),
    marginLeft: getAdaptation(11)
  }
};

const styleSheet = StyleSheet.create(styles);

export default styleSheet;
