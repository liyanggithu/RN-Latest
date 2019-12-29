import { observer, Provider as MobxProvider } from "mobx-react";
// import teaset from "teaset";
// import { SafeAreaView } from "react-navigation";
//日期本地化设置
import moment from "moment";
import "moment/locale/zh-cn";
import React, { Component } from "react";
import { Linking, Platform } from "react-native";
import userStore from "stores/userStore";
import { create } from "mobx-persist";
import stores from "stores";
import AsyncStorage from "@react-native-community/async-storage";
import Routes from "pages";
import KeepAwake from "react-native-keep-awake";
import Orientation from "react-native-orientation";
import SplashScreen from "react-native-splash-screen";
import configStore from "stores/configStore";
import navigationUtils from "utils/navigationUtils";
import { Provider as AntProvide } from "@ant-design/react-native";
moment.locale("zh-cn");

// 锁定竖屏
Orientation.lockToPortrait();

@observer
export default class RootApp extends Component {
  async componentDidMount() {
    // 监听外部url调用应用
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          // 如果是网址调用，是打不开到相关的路由的，要自己判断然后跳转；
          console.warn("Initial url is: " + url);
        }
      })
      .catch(err => console.error("An error occurred", err));

    try {
      const hydrate = create({ storage: AsyncStorage });
      await hydrate("configStore", configStore);
      // 判断是否首次打开app
      if (configStore.isFirstOpen) {
        console.log("首次打开app"); // 可能有跳到轮播图之类的
        configStore.toggleIsFirstOpen();
        this.loadSuccess();
        return;
      }
      await hydrate("userStore", userStore);
      let inited: boolean = await userStore.init();
      console.log("store同步", inited);

      // 检查热更新
      if (!__DEV__) {
        // checkAppUpdate();
      }
      this.loadSuccess();
    } catch (error) {
      console.log(error);
      // Toast.message(error.toString());
      this.loadSuccess();
    }
  }

  loadSuccess = () => {
    SplashScreen.hide();
    KeepAwake.activate();
  };

  render() {
    const prefix = Platform.OS == "android" ? "http://myApp/" : "myApp://"; // 注册deep link
    return (
      <AntProvide>
        <MobxProvider {...stores}>
          {/* <Routes /> */}
          <Routes
            uriPrefix={prefix}
            ref={navigatorRef => {
              navigationUtils.setTopLevelNavigator(navigatorRef);
            }}
          />
        </MobxProvider>
      </AntProvide>
    );
  }
}
