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
    flexDirection: "row",
    height: 50,
    borderTopWidth: getAdaptation(1),
    backgroundColor: "#bbb"
  },
  container_item: {
    flex: 1
  }
};

const styleSheet = StyleSheet.create(styles);

export default styleSheet;
