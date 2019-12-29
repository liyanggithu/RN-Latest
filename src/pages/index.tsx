import { ToastAndroid } from "react-native";
import { StackViewStyleInterpolator, createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "./Home";
import Login from "./Login";
import DemoTab1 from "./DemoTab/DemoTab1";
import DemoTab2 from "./DemoTab/DemoTab2";
import Webview from "./Webview";
import Camera from "./Camera";
import PreviewImage from "./PreviewImage";
import List from "./List";

import { NavigationActions, createAppContainer } from "react-navigation";

// const stateHandler = (prevState, newState, action) => {
//   console.log("onStateChange:", { prevState, newState, action });
// };

const transitionConfig = (): any => ({
  screenInterpolator: StackViewStyleInterpolator.forHorizontal
});

const DemoTab = createBottomTabNavigator(
  {
    DemoTab1: DemoTab1,
    DemoTab2: DemoTab2
  },
  {
    initialRouteName: "DemoTab1",
    backBehavior: "none",
    tabBarComponent: () => null
  }
);

const AppNavigator = createStackNavigator(
  {
    /** 外部网址 */
    Webview: {
      screen: Webview
    },
    /** 图片预览 */
    PreviewImage: {
      screen: PreviewImage
    },
    Home: {
      screen: Home
    },
    Login: {
      screen: Login
    },
    Camera: {
      screen: Camera
    },
    List: {
      screen: List
    },
    MainTab: {
      screen: DemoTab
    }
  },
  {
    initialRouteName: "Login",
    transitionConfig,
    headerMode: "none",
    navigationOptions: {
      gestureEnabled: true
    }
  }
);

/**
 * 处理安卓返回键
 */
let lastBackPressed = Date.now();
const defaultStateAction = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
  if (state && action.type === NavigationActions.BACK && state.routes.length === 1) {
    if (lastBackPressed + 2000 < Date.now()) {
      ToastAndroid.show("再按一次退出程序", ToastAndroid.SHORT);
      lastBackPressed = Date.now();
      const routes = [...state.routes];
      return {
        ...state,
        ...state.routes,
        index: routes.length - 1
      };
    }
  }
  return defaultStateAction(action, state);
};

export default createAppContainer(AppNavigator);
