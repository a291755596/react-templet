// import Maps from '../utils/tool';
// import * as op from '../config';

// (function(win) {
// var Client = function(options) {
//     var MAX_CONNECT_TIME = 10;
//     var DELAY = 1000 * 5;
//     this.options = options || {};
//     this.createConnect(MAX_CONNECT_TIME, DELAY);
// }

// Client.prototype.createConnect = function(max, delay) {
//     var self = this;
//     // if (max <= 0) {
//     //     console.log("最大尝试重连还剩", max, "次");
//     //     return;
//     // }
//     connect();

//     var heartbeatInterval;
//     // 心跳包时间
//     var HEART_TIME = 10;

//     function connect() {
//         var ws = new WebSocket(op.Websocket);
//         var auth = false;

//         ws.onopen = function() {
//             getAuth();
//         }

//         var notify = self.options.notify;
//         var amt = self.options.amt;
//         var info = self.options.info;
//         var settle = self.options.settle;
//         var getout = self.options.getout;
//         var notice = self.options.notice;

//         // console.log(">>>>>>>>>>>>>setTimeout auth", self.timer);
//         self.timer = setTimeout(getAuth, delay);
//         ws.onmessage = function(evt) {
//             var receives = JSON.parse(evt.data)
//             for (var i = 0; i < receives.length; i++) {
//                 var data = receives[i]
//                 if (data.op == op.OP_AUTH_REPLY) {
//                     console.log("Websocket 链接成功", data.body);
//                     auth = true;
//                     heartbeat();
//                     heartbeatInterval = setInterval(heartbeat, HEART_TIME * 1000);
//                     // console.log(">>>>>>>>>>>>>clearTimeout auth", self.timer);
//                     self.timer && clearTimeout(self.timer);
//                 }

//                 if (auth && notify) {
//                     switch (data.op) {
//                     case op.OP_AUTH_REPLY:
//                         console.log("Websocket 链接成功", data.body);
//                         continue;
//                     case op.OP_HEARTBEAT_REPLY:
//                         console.log("心跳包" + HEART_TIME + "秒");
//                         continue;
//                     case op.OP_SYS_ODS_REPLY:
//                         // console.log("ods行情", data.body);
//                         notify(data.body);
//                         continue;
//                     case op.OP_SYS_AMT_REPLY:
//                         console.log("用户余额变化", data.body);
//                         amt(data.body);
//                         continue;
//                     case op.OP_SYS_USER_INFO_REPLY:
//                         console.log("用户信息变化", data.body);
//                         info(data.body);
//                         continue;
//                     case op.OP_SYS_SETTLE_REPLY:
//                         console.log("用户竞购订单结算", data.body);
//                         settle(data.body);
//                         continue;
//                     case op.OP_DISCONNECT_REPLY:
//                         console.log("用户在另一端登录", data.body);
//                         getout(data.body);
//                         continue;
//                     case op.OP_SYS_INFO_REPLY:
//                         console.log("通知公告", data.body);
//                         notice(data.body);
//                         continue;
//                     default:
//                         console.log(data);
//                         continue;
//                     }
//                 }
//             }
//         }


//         ws.onclose = function() {
//             if (heartbeatInterval) clearInterval(heartbeatInterval);
//             self.timer && clearTimeout(self.timer);
//             setTimeout(reConnect, delay);
//         }
//         self.options.close = function() {
//             console.log("关闭长连接");
//             if (heartbeatInterval) clearInterval(heartbeatInterval);
//             self.timer && clearTimeout(self.timer);
//             ws.close();
//         }

//         function heartbeat() {
//             ws.send(JSON.stringify({
//                 'ver': 1,
//                 'op': op.OP_HEARTBEAT,
//                 'seq': 2,
//                 'body': {}
//             }));
//         }

//         function getAuth() {
//             var user = Maps.get("user");
//             console.log(">>>>>>>>>>>>>>>getAuth", user)
//             ws.send(JSON.stringify({
//                 'ver': 1,
//                 'op': op.OP_AUTH,
//                 'seq': 1,
//                 'body': {
//                     'Code': 3,
//                     'Msg': user ? user.Sid : '',
//                     'Data': "0"
//                 }
//             }));
//         }

//     }

//     self.options.connect = connect;

//     function reConnect() {
//         self.createConnect(--max, delay);
//     }
// }

// win['MyClient'] = Client;
// })(window);

