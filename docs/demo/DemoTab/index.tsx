import React from "react";
import { StackViewStyleInterpolator, createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "./Home";
import Login from "./Login";
import DemoTab1 from "./DemoTab/DemoTab1";
import DemoTab2 from "./DemoTab/DemoTab2";
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
    Home: {
      screen: Home
    },
    Login: {
      screen: Login
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
