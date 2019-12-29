import { observable, computed, observe, action, transaction, toJS } from "mobx";
import * as UserService from "services/UserService";
import { persist } from "mobx-persist";
import { Actions } from "react-native-router-flux";
import navigationUtils from "utils/navigationUtils";
// import { message } from "antd";

const initialData = {
  id: "",
  alias: ""
};
class UserStore {
  constructor() {}
  @persist @observable token = "";
  /** 是否已登录 */
  @persist @observable logined = false;
  /**用户资料 */
  @persist("object") @observable data = initialData;

  /** 初始化 */
  @action
  init = async () => {
    if (this.logined) {
      try {
        await this.loginSuccess(this.token);
        return true;
      } catch (error) {
        this.logoutSuccess();
        return false;
      }
    }
  };

  /** 获取用户资料 */
  @action
  getUserData = async () => {
    const data: any = await UserService.getUserDetailData();
    this.data = data;
    console.log("userStore.data", this.data);
  };

  /** 登录成功 */
  @action
  login = async (username: string, password: string) => {
    // message.loading("登录中..");
    try {
      const { token }: any = await UserService.login(username, password);
      await this.loginSuccess(token);
      // message.destroy();
      // message.success("登录成功");
    } catch (error) {
      // message.destroy();
      // message.error(error.message);
    }
  };

  /** 注销 */
  @action
  logout = async () => {
    try {
      await UserService.logout();
    } catch (error) {}
    this.logoutSuccess();
    // message.success("退出成功");
  };

  /** 登录成功 */
  @action
  loginSuccess = async (token: string) => {
    this.logined = true;
    this.token = token;
    await this.getUserData();
    navigationUtils.resetTo("Home");
  };

  /** 注销成功 */
  @action
  logoutSuccess = () => {
    this.logined = false;
    this.token = "";
    this.data = initialData;
    navigationUtils.resetTo("Login");
  };
}

const userStore = new UserStore();

export default userStore;
