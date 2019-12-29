import axios, { AxiosRequestConfig } from "axios";
import userStore from "stores/userStore";
import configStore from "stores/configStore";
import { Toast } from "@ant-design/react-native";

export function toQueryString(obj: any) {
  //转化 {a:1,b:2} => a=1&b=2
  let query = "",
    name,
    value,
    fullSubName,
    subName,
    subValue,
    innerObj: any,
    i;
  for (name in obj) {
    value = obj[name];
    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + "[" + i + "]";
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += toQueryString(innerObj) + "&";
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + "[" + subName + "]";
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += toQueryString(innerObj) + "&";
      }
    } else if (value !== undefined && value !== null) query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
  }
  return query.length ? query.substr(0, query.length - 1) : query;
}

function toFormData(obj: any) {
  // 转化 成formData
  let formData = new FormData();
  for (let name in obj) {
    formData.append(name, obj[name]);
  }
  return formData;
}

type Method = "get" | "post" | "put" | "delete";

export enum ContentType {
  json = "application/json;charset=UTF-8",
  form = "application/x-www-form-urlencoded",
  formData = "multipart/form-data;"
}

interface Response<T> {
  status: number;
  message: string;
  data: T;
}

export interface Options {
  contentType?: ContentType;
  timeout?: number;
  headers?: object;
  /** 不弹窗显示错误message */
  noShowErrorMessage?: boolean;
  /** 是否返回原数据：{code,data,message} */
  returnOriginData?: boolean;
}

function getContentTypeByMethod(method: Method) {
  let type: ContentType;
  switch (method) {
    case "get":
      type = ContentType.form;
      break;
    case "post":
    case "put":
    case "delete":
      type = ContentType.json;
      break;
    default:
      type = ContentType.json;
  }
  return type;
}

function formatSendDataByContentType(sendData: any, contentType: ContentType) {
  if (!sendData) {
    return sendData;
  }
  switch (contentType) {
    case ContentType.formData:
      sendData = toFormData(sendData);
      break;
    case ContentType.form:
      if (sendData) {
        sendData = "?" + toQueryString(sendData);
      }
      break;
    case ContentType.json:
      break;
    default:
      sendData = toQueryString(sendData);
      break;
  }
  return sendData;
}

/**
 * **代码示例-1**
 * ```typescript
    import errorCapture from "utils/errorCapture";
    async function ajax() {
      const resp:number = await interceptorAjax("get",'/api/1')
      return resp
    }
    // 正常异步
    async function demo1(){
      try {
        const resp = await ajax();
      } catch (error) {
        return;
      }
    }
    // 捕捉异步
    async function demo2(){
      const [error, resp] = await errorCapture(ajax());
      if (error) {
        console.log("errorCapture", error);
        return;
      }
    }
 * ```
 */
export function interceptorAjax<TReturnData>(method: Method, url: string, sendData: any = {}, options: Options = {}) {
  const contentType = options.contentType ? options.contentType : getContentTypeByMethod(method);
  const timeout = options.timeout ? options.timeout : 10 * 1000;
  sendData = formatSendDataByContentType(sendData, contentType);
  const requestOptions: AxiosRequestConfig = {
    timeout: timeout,
    method: method,
    url: configStore.rootApiUrl + url + (method === "get" ? sendData : ""),
    data: method !== "get" ? sendData : null,
    headers: {
      ...(options.headers || {}),
      "Content-Type": contentType,
      token: userStore.token
    }
  };
  return axios
    .request(requestOptions)
    .then((response: any) => {
      const resp: Response<TReturnData> = response.data;
      // console.log(url, resp);
      if (resp.status !== 200) {
        if (resp.status === 401) {
          console.log("code 401 返回登录页");
          userStore.logoutSuccess();
        }
        const errorMessage = resp.message || "未知错误：" + resp.status;
        throw new Error(errorMessage);
      }
      if (options.returnOriginData) {
        return resp;
      }
      return resp.data;
    })
    .catch((error: any) => {
      if (!options.noShowErrorMessage) {
        Toast.info(error.message);
      }
      throw error;
    });
}

export interface PageParam {
  [key: string]: any;
  page?: number;
  pageSize?: number;
  keyword?: string;
  /** 排序:"createdAt:DESC,updatedAt:ASC" */
  orderBy?: string;
}
