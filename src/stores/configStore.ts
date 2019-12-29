import { Platform, Dimensions, StatusBar, NativeModules } from "react-native";
import { observable, computed, action, reaction, toJS } from "mobx";
import { persist } from "mobx-persist";
const { width: D_WIDTH, height: D_HEIGHT } = Dimensions.get("window");

const { StatusBarManager } = NativeModules;

// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;

/** 系统配置 */
class ConfigStore {
  constructor() {
    this.initStatusBarHeight();
  }
  /** 设计图宽度 */
  designWidth = 750;
  /** 是否首次打开app */
  @persist @observable isFirstOpen = true;
  /** 系统平台环境 "ios" | "android" | "windows" | "macos" | "web" */
  osPlatform = Platform.OS;
  /** 是否为开发环境 */
  isDev = __DEV__;
  /** 系统api接口地址 */
  rootApiUrl = "http://xxxx";

  fitIPhoneX = true;
  @computed get isIPhoneX() {
    if (Platform.OS !== "ios") return false;
    return this.statusBarHeight >= 44;
  }
  get isPad() {
    if (Platform.OS !== "ios" || this.isIPhoneX) return false;
    // if portrait and width is smaller than iPad width
    if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
      return false;
    }
    // if landscape and height is smaller that iPad height
    if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
      return false;
    }
    return true;
  }
  get isLandscape() {
    return Dimensions.get("window").width > Dimensions.get("window").height;
  }

  @observable
  statusBarHeight = 0;

  @computed get screenInset() {
    const { isLandscape, isIPhoneX, fitIPhoneX, statusBarHeight } = this;
    return {
      left: isLandscape && isIPhoneX && fitIPhoneX ? 44 : 0,
      right: isLandscape && isIPhoneX && fitIPhoneX ? 44 : 0,
      top: statusBarHeight,
      bottom: isIPhoneX && fitIPhoneX ? (isLandscape ? 24 : 34) : 0
    };
  }

  /** 切换是否首次打开app */
  @action
  toggleIsFirstOpen = () => {
    this.isFirstOpen = !this.isFirstOpen;
  };

  @action initStatusBarHeight = async () => {
    if (Platform.OS === "ios") {
      const iosBarHeight: number = await new Promise(resolve => {
        StatusBarManager.getHeight(statusBarHeight => {
          resolve(statusBarHeight.height);
        });
      });
      this.statusBarHeight = this.isLandscape ? 0 : iosBarHeight;
      return;
    } else if (Platform.OS === "android") {
      if (Platform.Version > 20) {
        this.statusBarHeight = StatusBar.currentHeight; //translucent StatusBar is required
      } else {
        this.statusBarHeight = 0;
      }
      return;
    }
    this.statusBarHeight = this.isLandscape ? 0 : 20;
  };
}

const configStore = new ConfigStore();
export default configStore;
