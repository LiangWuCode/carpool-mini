import { defineStore, acceptHMRUpdate } from "pinia";
import { navLogin } from "@/common/ts/nav";

const userBase = { verifyStatus: 1, mobile: "" };
export const useUser = defineStore({
  /**
   * 仓库id是唯一标识
   *
   */
  id: "user",
  /**
   * 存储全局状态
   * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
   * 和 TS 类型推导
   *
   */
  state: () => {
    return {
      userInfo: { ...userBase },
      provider: "",
      access_token: "",
      refresh_token: "",
      accessExpiresIn: "",
      refreshExpiresIn: "",
      openId: "",
      uid: "",

      searchHistoryList: [],
      help: {}, // 助力
      give: {}, // 赠送领取
      bookings: {}, // 记录预约状态

      trialRemind: false, // false:免费试用未点击不在提醒按钮

      guideHandle: 0, // 引导步骤
      firstEntry: true, // 是否为首次进入

      guideType: {
        1: 0,
        2: 0,
      }, // 单品展览引导步骤 1:图片，2:红包

      hasBlindBoxRule: false, // 盲盒规则初次展示

      eastTicket: "", // 东方新天地授权信息
    };
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   *
   */
  getters: {},
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    setUser(result: any) {
      const {
        user,
        uid,
        accessToken,
        refreshToken,
        openId,
        accessExpiresIn,
        refreshExpiresIn,
      } = result;
      this.userInfo = user;
      this.accessExpiresIn = accessExpiresIn;
      this.refreshExpiresIn = refreshExpiresIn;
      this.openId = openId;
      this.uid = uid;
    },
    setUserInfo(info: any) {
      this.userInfo = info;
    },
    setToken(token: string, refreshToken?: string) {
      this.refresh_token = token;
      this.refresh_token = refreshToken || "";
    },
    removeToken() {
      this.userInfo = { ...userBase };
      this.refresh_token = "";
      this.refresh_token = "";
      this.accessExpiresIn = "";
      this.refreshExpiresIn = "";
      this.openId = "";
      this.uid = "";
    },
    logout() {
      this.removeToken();
      navLogin();
    },
    setProvider(provider: string) {
      this.provider = provider;
    },
    setVerifyStatus(type: number) {
      this.userInfo.verifyStatus = type;
    },
    setMobile(phone: string) {
      this.userInfo.mobile = phone;
    },
    pushHistoryList(key: string) {
      this.searchHistoryList.push(key as never);
    },
    clearHistoryList() {
      this.searchHistoryList = [];
    },

    setHelp(help: any) {
      this.help = help;
    },
    removeHelp() {
      this.help = {};
    },
    setGive(give: any) {
      this.give = give;
    },
    removeGive() {
      this.give = {};
    },

    setBookings(id: string) {
      this.bookings = {
        ...this.bookings,
        [id]: true,
      };
    },

    setRemind() {
      this.trialRemind = true;
    },

    setGuide() {
      this.guideHandle += 1;
    },

    setFirst() {
      this.firstEntry = false;
    },

    setGuideType(type: any, value: number) {
      this.guideType = {
        ...this.guideType,
        [type]: value,
      };
    },
  },
  // 持久化存储
  persist: {
    enabled: true,
    detached: true, // 设置订阅与组件分离
    H5Storage: window?.localStorage,
  },
});

// 添加热更新
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
