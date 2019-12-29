import { StyleSheet, Dimensions } from "react-native";
import configStore from "stores/configStore";

const wrapHeight = 35;
const styles = StyleSheet.create({
  container: {
    // paddingTop: configStore.statusBarHeight,
    // paddingBottom: 8,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  border: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1
  },

  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  leftWrap: {
    flexDirection: "row",
    alignItems: "center",
    height: wrapHeight,
    minWidth: 60
    // backgroundColor: '#bbb',
  },

  btn: {
    height: "100%",
    // paddingHorizontal: 8,
    width: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  btn_img: {
    width: "100%",
    height: "100%"
  },

  centerWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: wrapHeight
  },
  title: {
    width: "100%",
    fontSize: 18,
    flex: 1,
    textAlign: "center"
  },

  rightWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: wrapHeight,
    minWidth: 60
    // backgroundColor: '#bbb',
  }
});

export default styles;
