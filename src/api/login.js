import service from '../utils/request.js'

/**
 * 获取验证码
 */
export const GetMessageCode = () => {
    return service.request({
        method: 'post',
        url: '/getSms/',
        data: {},
    })
}