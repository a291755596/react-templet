import { Modal } from "antd-mobile";
import Maps, { gotologin, refresh } from "../utils/tool";
import * as Conf from "../config";
// import { pingtai } from "../ip";
const alert = Modal.alert;

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    if (response.status == 401) {
        alert("操作失败", "权限不够", [
            {
                text: "确定",
                onPress: () => console.log("ok"),
                style: {
                    fontWeight: "bold"
                }
            }
        ]);
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function requestX(url, data) {
    // var aData = []; //存储数据
    // var sData = ''; //拼接数据
    // for (let item in data) {
    //     aData.push(item + '=' + data[item]);
    // }
    // sData = aData.join('&');
    let user = Maps.get("user");
    let Req = {
        Code: 0,
        Msg: user ? user.Sid : "",
        Platform: pingtai,
        Data: data
    };
    let setting = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Req)
    };
    //属性覆盖
    // for (let item in options) {
    //   setting[item] = options[item];
    // }
    return fetch(url, setting)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            if (!data) {
                alert("操作失败", "请稍后尝试...", [
                    {
                        text: "确定",
                        onPress: () => console.log("操作失败,data传送参数为空"),
                        style: {
                            fontWeight: "bold"
                        }
                    }
                ]);
                return null;
            }
            if (data.Code != Conf.ErrorNil) {
                if (data.Code == Conf.ErrorSidQueNil) {
                    alert("操作失败", "登录状态已过期,是否重新登录?", [
                        {
                            text: "取消",
                            onPress: () => console.log("不重新登录"),
                            style: {
                                fontWeight: "bold"
                            }
                        },
                        {
                            text: "确定",
                            onPress: () => {
                                gotologin();
                            },
                            style: {
                                fontWeight: "bold"
                            }
                        }
                    ]);
                } else {
                    alert("操作失败", data.Msg, [
                        {
                            text: "确定",
                            onPress: () => console.log("确定"),
                            style: {
                                fontWeight: "bold"
                            }
                        }
                    ]);
                }
                return null;
            } else {
                return data.Data;
            }
        })
        .catch(err => {
            alert("操作失败", "请稍后尝试...", [
                {
                    text: "确定",
                    onPress: () => {
                        return refresh();
                    },
                    style: {
                        fontWeight: "bold"
                    }
                }
            ]);
        });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function requestForm(url, data) {
    let formData = new FormData();
    formData.append("imgfile", data.file);
    let user = Maps.get("user");
    formData.append("sid", user ? user.Sid : "");
    formData.append("Platform", pingtai);

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        if (xhr) {
            xhr.onreadystatechange = e => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.Code == 0) {
                            resolve(response.Data);
                        } else {
                            if (data.Code == Conf.ErrorSidQueNil) {
                                alert("操作失败", "登录状态已过期,是否重新登录?", [
                                    {
                                        text: "取消",
                                        onPress: () => console.log("不重新登录"),
                                        style: {
                                            fontWeight: "bold"
                                        }
                                    },
                                    {
                                        text: "确定",
                                        onPress: () => {
                                            gotologin();
                                        },
                                        style: {
                                            fontWeight: "bold"
                                        }
                                    }
                                ]);
                            } else {
                                alert("操作失败", data.Msg, [
                                    {
                                        text: "返回",
                                        onPress: () => console.log("返回"),
                                        style: {
                                            fontWeight: "bold"
                                        }
                                    },
                                    {
                                        text: "刷新",
                                        onPress: () => refresh(),
                                        style: {
                                            fontWeight: "bold"
                                        }
                                    }
                                ]);
                                resolve("err");
                            }
                        }
                    } else {
                        alert("上传头像失败");
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        }
    }).then(
        function(message) {
            return message;
        },
        function(error) {
            alert("操作失败", "请稍后尝试...", [
                {
                    text: "确定",
                    onPress: () => {
                        return refresh();
                    },
                    style: {
                        fontWeight: "bold"
                    }
                }
            ]);
        }
    );
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, data) {
    let user = Maps.get("user");
    let Req = {
        Code: 0,
        Msg: user ? user.Sid : "",
        Data: data
    }
    console.log(">>url:", url);
    console.log(">>request:", Req);
    // console.log("request url = ", url, "params = ", Req);
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        if (xhr) {
            xhr.onreadystatechange = e => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.Code == 0) {
                            console.log(">>back:", response.Data);
                            resolve(response.Data)
                        } else {
                            if (response.Code == Conf.ErrorSidQueNil) {
                                alert("操作失败", "登录状态已过期,是否重新登录?", [
                                    {
                                        text: "取消",
                                        onPress: () => console.log("不重新登录"),
                                        style: {
                                            fontWeight: "bold"
                                        }
                                    },
                                    {
                                        text: "确定",
                                        onPress: () => {
                                            gotologin();
                                        },
                                        style: {
                                            fontWeight: "bold"
                                        }
                                    }
                                ]);
                                resolve("error");
                            } else {
                                console.log("操作失败 url = ",url)
                                alert("操作失败", response.Msg, [
                                    {
                                        text: "确定",
                                        onPress: () =>{console.log("操作失败");},
                                        style: {
                                            fontWeight: "bold"
                                        }
                                    }
                                ]);
                                resolve("error");
                            }
                        }
                    } else {
                        alert("网络异常");
                        reject(xhr.responseText);
                        return;
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(Req));
        }
    }).then(
        function(message) {
            return message;
        },
        function(error) {
            alert("操作失败", "请稍后尝试...", [
                {
                    text: "确定",
                    onPress: () => {
                        console.log("操作失败");
                        return;
                    },
                    style: {
                        fontWeight: "bold"
                    }
                }
            ]);
        }
    );
}

export async function reget(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        if (xhr) {
            xhr.onreadystatechange = e => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else {
                        alert("网络异常");
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(null);
        }
    }).then(
        function(message) {
            return message;
        },
        function(error) {
            alert("操作失败", "请稍后尝试...", [
                {
                    text: "确定",
                    onPress: () => {
                        return refresh();
                    },
                    style: {
                        fontWeight: "bold"
                    }
                }
            ]);
        }
    );
}

// 无返回弹出层
export async function requestNo(url, data) {
    let user = Maps.get("user");
    let Req = {
        Code: 0,
        Msg: user ? user.Sid : "",
        Platform: pingtai,
        Data: data
    };
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        if (xhr) {
            xhr.onreadystatechange = e => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.Code == 0) {
                            resolve(response.Data);
                        } else {
                            if (response.Code == Conf.ErrorSidQueNil) {
                                resolve("error");
                            } else {
                                resolve("error");
                            }
                        }
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(Req));
        }
    }).then(
        function(message) {
            return message;
        },
        function(error) {}
    );
}
