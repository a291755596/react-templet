import { Modal } from 'antd-mobile';
import Maps, { gotologin, refresh } from '../utils/tool';
import * as Conf from '../config';

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
export default function requestWxlogin(url, data) {  
     let urldata=url+"?"+data
     return fetch(urldata)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {      
            if(data.openid){         
                return data.openid;  
            } 
            return "";  
        })
        .catch(err => {
            alert('操作失败', '系统异常', [
                {
                    text: '确定',
                    onPress: () => {
                        console.log(err.message);
                        return refresh();
                    },
                    style: {
                        fontWeight: 'bold'
                    }
                },
            ]);
        });
}

