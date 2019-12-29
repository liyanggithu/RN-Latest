import { StyleSheet, PixelRatio, Dimensions } from "react-native";
import configStore from "stores/configStore";
const pixelRatio = PixelRatio.get();
let { width, height } = Dimensions.get("window");

function getAdaptation(num) {
  let unitWidth = width / configStore.designWidth; // 750 => UI设计图的宽度
  return parseFloat((num * unitWidth).toFixed(2));
}

let styles = {
  box: {
    width: getAdaptation(750),
    height: getAdaptation(100),
    backgroundColor: "#bbb",
    marginTop: getAdaptation(20),
    marginBottom: getAdaptation(20),
    marginRight: 0,
    marginLeft: 0
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff"
  },
  container_box2: {}
};

let media = {
  "width>=500&&width<=1000": {
    box: {
      backgroundColor: "#f00"
    }
  },
  "width>=1000&&width<=1600": {
    box: {
      backgroundColor: "#fff"
    }
  }
};
// 媒体查询
(function addMedia(){
  for(let k in media){
    if(eval(k)){
      for(let j in media[k]){
        styles[j] = Object.assign(styles[j] || {}, media[k][j]);
      }
    }
  }
}());

const styleSheet = StyleSheet.create(styles);

export default styleSheet;
