/**
 * 用户相关api
 */
import { interceptorAjax } from "services/commonFn";

export type LoginResponse = {
  userId: string;
  token: string;
  userInfo: any;
};

/** 登录 */
export async function login(username: string, password: string): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userId: "1",
        token: "233",
        userInfo: {
          id: "1",
          username: "admin",
          email: null,
          phone: null,
          avatar: null,
          alias: "管理员",
          realName: null,
          signature: null,
          status: true,
          lastActivedAt: null,
          createdAt: "2019-08-12T18:17:17.000Z",
          updatedAt: "2019-08-12T18:17:17.000Z"
        }
      });
    }, 500);
  });
  return await interceptorAjax<any>("post", "/api/user/loginByPassword", { username, password });
}

/** 注销 */
export async function logout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
  return await interceptorAjax<any>("post", "/api/user/logout");
}

/** 获取 用户基本资料 */
export async function getUserDetailData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: "1",
        username: "admin",
        email: null,
        phone: null,
        avatar: null,
        alias: "管理员",
        realName: null,
        signature: null,
        status: true,
        lastActivedAt: null,
        createdAt: "2019-08-12T18:17:17.000Z",
        updatedAt: "2019-08-12T18:17:17.000Z"
      });
    }, 500);
  });
  return await interceptorAjax<any>("get", "/api/user/getInfo");
}
