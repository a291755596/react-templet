// import { ip, host } from "./ip";

// 平台代码
// export const Android = 1; // Android平台代号
// export const IOS = 2; // IOS平台代号
// export const PC = 3; // PC平台代号
// export const YDWeb = 4; // 移动端web平台代号,微信端
// export const PCWeb = 5; // PC端web平台代号

// // 状态判断
// export const ErrorNil = 0;
// export const ErrorFail = 1;
// export const ErrorSidReqNil = 2;
// export const ErrorSidQueNil = 3;
// export const ErrorSidTimeOut = 4;

// 模板
// export const DUserInfo = host + "/api/app/oluser/user/info"; // 刷新用户信息


/***************************[websocket消息推送系统操作代号]********************************/
// 客户端请求建立握手
// export const OP_HANDSHAKE = 0
// export const OP_HANDSHAKE_REPLY = 1
// // 客户端发起心跳包
// export const OP_HEARTBEAT = 2
// export const OP_HEARTBEAT_REPLY = 3
// // 断开连接
// export const OP_DISCONNECT = 4
// export const OP_DISCONNECT_REPLY = 5 //服务端主动断开，一般另一端登录踢包
// // 客户端发起权限认证
// export const OP_AUTH = 6
// export const OP_AUTH_REPLY = 7

// // 系统警告通知
// export const OP_SYS_WARNING_REPLY = 9
// // 系统信息通知
// export const OP_SYS_INFO_REPLY = 11
// // 系统资金变化通知
// export const OP_SYS_AMT_REPLY = 13
// // 系统ODS行情推送
// export const OP_SYS_ODS_REPLY = 15

// // 进入和退出房间
// export const OP_ROOM_IN = 16
// export const OP_ROOM_IN_REPLY = 17
// export const OP_ROOM_OUT = 18
// export const OP_ROOM_OUT_REPLY = 19

// // 客户端给用户或者房间发消息
// export const OP_SEND_USER_MSG = 20
// export const OP_SEND_USER_MSG_REPLY = 21
// export const OP_SEND_ROOM_MSG = 22
// export const OP_SEND_ROOM_MSG_REPLY = 23

// // 用户A收到用户B的消息
// export const OP_RECV_USER_MSG_REPLY = 25
// // 用户A收到房间001的消息
// export const OP_RECV_ROOM_MSG_REPLY = 27
// // 系统订单结算通知
// export const OP_SYS_SETTLE_REPLY = 29
// // 系统用户信息变化通知
// export const OP_SYS_USER_INFO_REPLY = 31

// // 消息系统内部专用
// export const OP_RAW = 255
// export const OP_PROTO_READY = 254
// export const OP_PROTO_FINISH = 253
