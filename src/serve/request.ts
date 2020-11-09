// @ts-nocheck
import { UserModule } from '@/store/modules/user';
import { SystemModule } from '@/store/modules/system';
import Request from '@/utils/luch-request/index.js';
import { $Toast, $redirect, $navigateTo, $getCurrentPage } from '@/utils/util';

const service = new Request({
    baseURL: process.env.VUE_APP_API,
    timeout: 15000,
    dataType: "json",
    header: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// Request interceptors
service.interceptors.request.use(
    (config) => {
        //#ifdef H5
        config.header['device'] = 'wap';
        //#endif

        //#ifdef MP-WEIXIN
        config.header['device'] = 'wx';
        //#endif

        //#ifdef APP_PLUS
        config.header['device'] = 'app';
        config.header['vcode'] = plus.runtime.versionCode;
        const vcode = plus.runtime.versionCode;
        //#endif

        if (UserModule.token && UserModule.token != 'undefined') {
            // config.header['token'] = UserModule.token;
        }
        config.header['token'] = '9dceSNszlOx8PDrJeFKntvyF00TcgpBiaYMUSwRmXlBWtBE5nt2wYv8b2sOkW0Y3YMSXOfu2gf0or3Y7vOSuow'; // 这里是为了接口测试，实际使用上面的部分

        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptors
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if(res.id != 1000) {
             // 登录失效
             if(res.id == '0000') {
                // UserModule.ResetToken();

            }
        } 
        return response.data;

    },
    (error) => {
        const redirect = $getCurrentPage();
        if(error.statusCode) {
            $navigateTo({
                url: `/pages/error/error?code=${error.statusCode}`
            });
        } else {
            $Toast({
                message: '网络异常'
            })
        }
        return Promise.reject(error);
    }
)

export default service
