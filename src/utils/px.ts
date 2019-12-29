import { Dimensions } from "react-native";

const designWidth: number = 750;
const { width: screenWidth } = Dimensions.get("window");

export function calcPx(designPx: number) {
  return (screenWidth * designPx) / designWidth;
}
