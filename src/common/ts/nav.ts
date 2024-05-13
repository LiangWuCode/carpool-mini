import { loginAction } from "@/service/login";
import { checkIsWechatBrowser, getRedirect } from "../utils";
import {  reLaunch } from "../utils/base";
import pinia from "@/store/store";
import { useUser } from "@/store/user";
import { IUserInfo } from "@/interfaces/common";

// 登录
export const navLogin = (options: any = {}, isLogin: boolean = true) => {
  const userStore = useUser(pinia);
  const isLogined = userStore.isLogined()
  //当前小程序登录为静默形式
  if (isLogin&&!isLogined) {
    uni.login({
      provider: 'weixin',
      success: async function (loginRes) {
        if (loginRes.errMsg === 'login:ok') {
          const res = await loginAction(loginRes.code)
          userStore.setUserInfo(res.data as IUserInfo)
        }
      },
    })
    return;
  }

  let path = "";

  // #ifdef H5
  if (!checkIsWechatBrowser()) {
    path = "/pages/common/login/h5Login";
  }
  // #endif
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
