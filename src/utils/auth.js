import Maps from './tool';

export default function authed(route, replace) {
    let muser = Maps.get('user');
    if (!muser) {
        console.log("map里没有有用户,用户未登录");
        replace('/login');
    }
}