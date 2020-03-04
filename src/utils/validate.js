/**
 *  过滤特殊字符
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 *  验证邮箱
 */
export function validateEmail (s) {
    let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
    return !reg.test(s);
}
/**
 *  验证密码  数字字母组合
 */
export function validatePwd (s) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return !reg.test(s);
}
/**
 *  验证验证码  6位字母或者数字
 */
export function validateVcode (s) {
    let reg = /^[a-zA-Z0-9]{6}$/;
    return !reg.test(s);
}