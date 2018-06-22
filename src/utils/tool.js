import { Toast } from 'antd-mobile';
import * as Urls from '../config';
/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
const Maps = {};
Maps.get = function(key, value) {
if (arguments.length == 1) {
    let val = localStorage.getItem(key);
    if (val != "undefined") {
        return JSON.parse(val);
    } else {
        return null;
    }
} else {
    return localStorage.setItem(key, JSON.stringify(value));
}
}

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
Maps.delete = function(key) {
if (key) {
    return localStorage.removeItem(key);
}
return localStorage.removeItem();
}

export default Maps;

export async function gotologin() {
    Maps.delete('user');
    return window.location.href = '/#/login';
}
export async function gotohome() {
    return window.location.href = '/';
}
export async function refresh() {
    // return window.location.reload(false);
    return window.location.reload(true);
// return window.location.href = window.location.href;
}

/******************************对象数组根据某个键值排序功能*******************************************/
// employees.sort(by('age',by('name')));
export function by(name, minor) {
    return function(o, p) {
        var a,
            b;
        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            thro("error");
        }
    }
}

/******************************图片上传压缩处理*******************************************/
let filechooser = document.getElementById("choose");

/*用于压缩图片的canvas*/
let canvas = document.createElement("canvas");
let ctx = canvas.getContext('2d');

/*瓦片canvas*/
let tCanvas = document.createElement("canvas");
let tctx = tCanvas.getContext("2d");

let maxsize = 20 * 1024;

export function uploadfile(e, setval) {
    e.preventDefault();
    let target = e.target;
    let files = target.files;
    if (files.length > 9) {
        Toast.fail("最多同时只可上传9张图片", 1);
        return;
    }
    console.log(files);

    for (let i = 0; i < files.length; i++) {
        forearch(files[i], i, setval)
    }
}
;

function forearch(file, i, setval) {
    if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return Toast.fail("图片格式不对", 1);
    let reader = new FileReader();
    /*获取图片大小*/
    let size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
    console.log("上传图片大小:", size);

    reader.onload = function() {
        let result = this.result;
        let img = new Image();
        img.src = result;

        /*如果图片大小小于100kb，则直接上传*/
        if (result.length <= maxsize) {
            img = null;
            upload(result, file.type, setval);
            return;
        }

        /*图片加载完毕之后进行压缩，然后上传*/
        if (img.complete) {
            let data = compress(img);
            upload(data, file.type, setval);
            img = null;
        } else {
            img.onload = callback;
        }
    };
    reader.readAsDataURL(file);
}
/*  使用canvas对大图片进行压缩*/
function compress(img) {
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;

    /*如果图片大于四百万像素，计算压缩比并将大小压至400万以下*/
    let ratio;
    if ((ratio = width * height / 1500000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
        console.log(width, "x", height, "=", ratio);
    } else {
        ratio = 1;
    }

    canvas.width = width;
    canvas.height = height;

    /*铺底色*/
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /*如果图片像素大于100万则使用瓦片绘制*/
    let count;
    if ((count = width * height / 1000000) > 1) {
        /*计算要分成多少块瓦片*/
        count = ~~(Math.sqrt(count) + 1);
        /*计算每块瓦片的宽和高*/
        let nw = ~~(width / count);
        let nh = ~~(height / count);

        tCanvas.width = nw;
        tCanvas.height = nh;

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }

    /*进行最小压缩*/
    let ndata = canvas.toDataURL('image/jpeg', 0.4);

    console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length);
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

    return ndata;
}
/*图片上传，将base64的图片转成二进制对象，塞进formdata上传*/
function upload(basestr, type, setval) {
    let text = window.atob(basestr.split(",")[1]);
    let buffer = new Uint8Array(text.length);
    let pecent = 0,
        loop = null;

    for (let i = 0; i < text.length; i++) {
        buffer[i] = text.charCodeAt(i);
    }

    let blob = getBlob([buffer], type);

    let xhr = new XMLHttpRequest();

    let formdata = getFormData();

    formdata.append('file', blob);

    xhr.open('post', Urls.DUploadFile);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let jsonData = JSON.parse(xhr.responseText);
            if (jsonData.Code == 3) {
                message.success("上传图片成功");
                console.log(jsonData.Data);
                setval(jsonData.Data);
            } else {
                message.error(response.Msg)
            }
        }
    };
    xhr.send(formdata);
}
/**
 * 获取blob对象的兼容性写法
 * @param buffer
 * @param format
 * @returns {*}
 */
function getBlob(buffer, format) {
    try {
        return new Blob(buffer, {
            type: format
        });
    } catch ( e ) {
        let bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        buffer.forEach(function(buf) {
            bb.append(buf);
        });
        return bb.getBlob(format);
    }
}
/**
 * 获取formdata
 */
function getFormData() {
    let isNeedShim = ~navigator.userAgent.indexOf('Android') && ~navigator.vendor.indexOf('Google') && !~navigator.userAgent.indexOf('Chrome') && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
    return isNeedShim ? new FormDataShim() : new FormData()
}
/**
 * formdata 补丁, 给不支持formdata上传blob的android机打补丁
 * @constructor
 */
function FormDataShim() {
    console.warn('using formdata shim');

    let o = this,
        parts = [],
        boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
        oldSend = XMLHttpRequest.prototype.send;

    this.append = function(name, value, filename) {
        parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

        if (value instanceof Blob) {
            parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
            parts.push(value);
        } else {
            parts.push('\r\n\r\n' + value);
        }
        parts.push('\r\n');
    };

    // Override XHR send()
    XMLHttpRequest.prototype.send = function(val) {
        let fr,
            data,
            oXHR = this;

        if (val === o) {
            // Append the final boundary string
            parts.push('--' + boundary + '--\r\n');

            // Create the blob
            data = getBlob(parts);

            // Set up and read the blob into an array to be sent
            fr = new FileReader();
            fr.onload = function() {
                oldSend.call(oXHR, fr.result);
            };
            fr.onerror = function(err) {
                throw err;
            };
            fr.readAsArrayBuffer(data);

            // Set the multipart content type and boudary
            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            XMLHttpRequest.prototype.send = oldSend;
        } else {
            oldSend.call(this, val);
        }
    };
}