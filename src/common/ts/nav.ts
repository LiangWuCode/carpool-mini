import { checkIsWechatBrowser, getRedirect } from "../utils";
import { reLaunch } from "../utils/base";

// 登录
export const navLogin = (options: any = {}, isLogin: boolean = false) => {
  let path = "/pages/common/login/login";

  // #ifdef H5
  if (!checkIsWechatBrowser()) {
    path = "/pages/common/login/h5Login";
  }
  // #endif

  if (isLogin) {
    const redirect = getRedirect();
    reLaunch({
      url: `${path}?redirect=${redirect}`,
    });
    return;
  }

  let params = [];
  for (let key in options) {
    if (options[key]) {
      const element = options[key];
      params.push(`${key}=${element}`);
    }
  }

  if (params.length > 0) path = `${path}?${params.join("&")}`;

  reLaunch({
    url: path,
  });
};
