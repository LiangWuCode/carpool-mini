import { navLogin } from "../ts/nav";
import {
  getSystemInfoSync,
  navigateBack,
  navigateTo,
  redirectTo,
  switchTab,
  showLoading as uniShowLoading,
  showToast,
} from "./base";

export const toast = function (text: string, duration?: number, icon?: string) {
  showToast({
    title: text || "出错啦~",
    icon: icon ? icon : "none",
    duration: duration || 2000,
  });
};

export const showLoading = function (title?: string, mask = true) {
  uniShowLoading({
    mask: mask,
    title: title || "请稍等...",
  });
};

// 获取当前页面路劲和参数
export const getRedirect = () => {
  let pages = getCurrentPages(); // 获取页面指针数组
  let { route, options, $page }: any = pages[pages.length - 1]; // 获取当前页
  // console.log('currentPage', pages[pages.length - 1], route, options) // 当前页的路径

  let url = route;
  let params = [];
  let opt = options || $page?.options;

  if (opt) {
    for (const key in opt) {
      console.log(key, opt[key]);

      if (opt[key]) {
        const element = opt[key];
        // params.push(`${key}=${element}&`)
        params.push(`${key}=${element}`);
      }
    }
  }
  console.log(`/${url}${params.length > 0 ? "?" + params.join("&") : ""}`);

  return `/${url}${params.length > 0 ? "?" + params.join("&") : ""}`;
};
// 处理路由参数
export const getRouteOptions = (path: string, options?: any) => {
  let params = [];
  if (typeof options === "string" || !options) return `${path}?${options}`;
  for (let key in options) {
    if (options[key]) {
      const element = options[key];
      params.push(`${key}=${element}`);
    }
  }

  if (params.length > 0) path = `${path}?${params.join("&")}`;
  return path;
};
//判断是否登录/token
export const isLogin = function (name = "IDEM_ACCESS_TOKEN") {
  // return getToken(name) ? true : false
  return true;
};
//跳转页面，校验登录状态
export const href = function (url: string, isVerify = false, type?: string) {
  const pages = getCurrentPages();

  if (isVerify && !isLogin()) {
    navLogin({
      redirect: encodeURIComponent(url),
    });
  } else if (type === "redirectTo" || pages.length > 7) {
    redirectTo({
      url: url,
    });
  } else {
    navigateTo({
      url: url,
    });
  }
};
// 返回
export const navBack = () => {
  console.log("navBack");
  let delta = 1;
  navigateBack({
    delta: delta,
    fail: () => {
      switchTab({ url: "/pages/index/index" });
    },
  });
};
// 延迟函数
export const delay = (timeout = 2000, cb?: Function) => {
  return new Promise((res: Function) => {
    let timer: any = setTimeout(() => {
      cb && cb();
      clearTimeout(timer);
      timer = null;
      res();
    }, timeout);
  });
};

// 微信客户端版本号比较
export const compareVersion = (v1: any, v2: any) => {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
};
// 判断字符串是否为图片
export const hasImage = (url: string) => {
  const reg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/;
  return reg.test(url);
};

// 手机号验证
export const hasPhoone = (phone: string) => {
  const regMobile = /^1[3-9]\d{9}$/;
  return regMobile.test(phone);
};
// 数字单位
export const numUnit = (num: number) => {
  if (typeof num !== "number") return "";
  if (num > 9999) return (num / 10000).toFixed(1) + "万";
  if (num > 999) return (num / 1000).toFixed(1) + "千";
  return num;
};
// 判断是否是http/https开头的
export const hasHttp = (url: string) => {
  // 正则判断
  const reg = /^(http|https):\/\/([\w.]+\/?)\S*/;

  return reg.test(url);
};
// 图片增加域名
export const setImgUrl = (url: string, format?: string) => {
  if (!url) return url;
  if (url[0] === "/") url = url.slice(1);
  if (!hasHttp(url)) {
    url = `https://oss.faceface2.com/${url}`;
  }

  if (format) url = url + format;
  return url;
};
// 隐私信息脱敏
export const desensitization = (str: string, type: string = "phone") => {
  if (type === "phone") {
    return str.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2");
  } else if (type === "idcard") {
    return str.replace(/^(.{6})(?:\d+)(.{2})$/, "$1**********$2");
  }

  return "";
};

//获取当前的平台(终端类型 1 android 2 ios 3 h5 4 微信小程序 5 web)
export const getPlatform = () => {
  //默认web
  let platform = 5;
  //#ifdef APP-PLUS || APP-NVUE
  const system = getSystemInfoSync();
  if (system.platform === "ios") {
    platform = 1;
  } else {
    platform = 2;
  }
  //#endif

  //#ifdef H5
  platform = 3;
  //#endif

  //#ifdef MP-WEIXIN
  platform = 4;
  //#endif
  return platform;
};

//判断浏览器是否是微信浏览器
export const checkIsWechatBrowser = () => {
  let platform = getPlatform();
  if (platform === 3) {
    const str: any = navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
    return str == "micromessenger";
  } else {
    return false;
  }
};
