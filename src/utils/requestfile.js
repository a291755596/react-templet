import { Modal } from 'antd-mobile';
import Maps, { gotologin, refresh } from '../utils/tool';
import * as Conf from '../config';
import { pingtai } from '../ip'

const alert = Modal.alert;

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    if (response.status == 401) {
        alert('操作失败', '权限不够', [
            {
                text: '确定',
                onPress: () => console.log('ok'),
                style: {
                    fontWeight: 'bold'
                }
            },
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
export default function requestForm(url, data) {
    let formData = new FormData();

    let user = Maps.get('user');
    formData.append("sid", user ? user.Sid : '');


    if (data) {
        for (var item in data) {
            formData.append(item, data[item]);
        }
    }

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        if (xhr) {
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.Code == 0) {
                            resolve(response.Data)
                        } else {
                            if (response.Code == Conf.ErrorSidQueNil) {
                                alert('操作失败', '登录状态已过期,是否重新登录?', [
                                    {
                                        text: '取消',
                                        onPress: () => console.log('不重新登录'),
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    {
                                        text: '确定',
                                        onPress: () => {
                                            gotologin();
                                        },
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                ]);
                                resolve("error")
                            } else {
                                alert('提示', response.Msg, [
                                    {
                                        text: '返回',
                                        onPress: () => console.log('返回'),
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    {
                                        text: '刷新',
                                        onPress: () => refresh(),
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                ]);
                                resolve("error")
                            }
                        }
                    } else {
                        alert("服务忙请稍后重试,或者联系客服!");
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.send(formData);
        }
    }).then(function(message) {
        return message;
    }, function(error) {
        alert('操作失败', '系统异常', [
            {
                text: '确定',
                onPress: () => {
                    return refresh();
                },
                style: {
                    fontWeight: 'bold'
                }
            },
        ]);
    })
}
