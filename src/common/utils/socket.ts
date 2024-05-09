import { getScoketURL } from "./config";

type Props = {
  uid: string | number;
};

export default class Socket {
  socketTask: any = null;
  uid: number | string = 0;
  socketOpen: boolean = false;
  closeSocket: boolean = false;
  timer: any = null;
  timerPing: any = null;
  number: number = 0;
  ping: number = 0;
  stateData = {};

  constructor(props: Props) {
    console.log("Socket:", props);
    this.uid = props.uid;
    this.uid && this.openSocket(this.uid);
  }

  // 打开websocket
  openSocket = (uid: number | string) => {
    console.log("打开socket:", uid);
    if (!uid) return;
    uid = uid;

    const _this = this;
    // 链接 socket
    _this.socketTask = uni.connectSocket({
      url: getScoketURL() + uid,
      success: (res) => {
        console.log(res);
        // that.sendSocketMessage(that.stateData);
      },
      fail(err) {
        console.log(err);
      },
    });
    // 监听socket成功事件
    _this.socketTask.onOpen(function (res: any) {
      console.log("WebSocket连接已打开！");
      _this.socketOpen = true;

      // console.time()
      _this.sendSocketMessage("ping");
      _this.socketManage();

      // 后台socket超时时间为10分钟，前端9分钟的时候向后台socket传送数据重置10分钟超时时间
      // timer = setInterval(function () {
      //   // console.log('循环，重置socket后台超时时间');
      //   console.log('websocket心跳链接');
      //   sendSocketMessage('ping');
      // }, 540000);
    });
    // socket连接失败
    _this.socketTask.onError(function (res: any) {
      console.log("WebSocket连接打开失败，请检查！");
      if (_this.closeSocket) {
        //判断当前页面是否隐藏或销毁
        setTimeout(function () {
          _this.closeTheSocket();
          _this.openSocket(uid);
        }, 10000);
      }
    });

    _this.onSocketClose();
  };

  // 发送websocket请求
  sendSocketMessage = (data: any) => {
    const _this = this;
    _this.socketTask.send({
      data: JSON.stringify(data),
      success(res: any) {
        console.log("SOCKET数据发送成功：" + JSON.stringify(data));
        clearTimeout(_this.timerPing);
        // 只执行一次
        if (_this.number == 1) {
          _this.number = 2;
          _this.socketManage();
        }
      },
      fail(res: any) {
        console.log("发送失败 ");
        _this.onSocketClose();
        _this.ping++;
        if (_this.ping > 20) {
          // 连续20次连接失败
          // that.ping = 0
          clearTimeout(_this.timerPing);
          _this.timerPing = setTimeout(function () {
            _this.sendSocketMessage("ping");
          }, 20000);
          return;
        }
        let time: any = setTimeout(() => {
          _this.sendSocketMessage("ping");
          clearTimeout(time);
          time = null;
        }, 3000);
      },
    });
  };

  // socket返回数据
  socketManage = () => {
    // 接受的socket数据
    this.socketTask.onMessage((res: any) => {
      // console.log('收到服务器内容1：' + JSON.stringify(res.data));
      console.log("=============================================");
      console.log("收到服务器推送的内容：" + res.data);
      console.log("=============================================");
      res.data !== '"ping"' &&
        JSON.parse(res.data).cmd === "open_box" &&
        uni.$emit("blindBoxMessage", JSON.parse(res.data));

      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = setInterval(() => {
        // console.log('循环，重置socket后台超时时间');
        console.log("websocket心跳链接");
        this.sendSocketMessage("ping");
      }, 15000);
    });
  };

  // 监听socket关闭事件
  onSocketClose = () => {
    this.socketTask.onClose((res: any) => {
      console.log("WebSocket 已关闭！");
      // console.timeEnd()
      this.timer && clearInterval(this.timer);
      this.timerPing && clearTimeout(this.timerPing);
      this.timer = null;
      this.timerPing = null;
    });
  };

  // 关闭socket链接
  closeTheSocket = () => {
    this.socketTask &&
      this.socketTask.close({
        success: (res: any) => {
          console.log("关闭webSocket");
          this.socketOpen = false;
          // that.$store.commit('changeSocketOpen', that.socketOpen);
        },
      });

    this.timer && clearInterval(this.timer);
    this.timerPing && clearTimeout(this.timerPing);
    this.timer = null;
    this.timerPing = null;
  };
}
