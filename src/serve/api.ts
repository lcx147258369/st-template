import service from './request';
import { debounce } from '@/utils/util';


//注册账号
export const register = (data: any) =>
      service.request({
            url: '/system/?do=reg',
            method: 'POST',
            data
      })

//账号登陆
export const login = (data: any) =>
      service.request({
            url: '/system/?do=login',
            method: 'POST',
            data
      })

//手机登录
export const smsLogin = (data: any) =>
      service.request({
            url: '/system/?do=sms_login',
            method: 'POST',
            data
      })


//退出登录
export const logout = () =>
      service.request({
            url: '/user?do=logout',
            method: 'POST'
      })

// 小程序登录
export const mpWeixinLogin = (data: any) =>
    service.request({
        url: '/wx/?do=mp_login', 
        method: 'POST',
        data
    })

// 后台openID登录
export const openidLogin = (data: any) => 
    service.request({
        url: '/system/?do=openid_login',
        method: 'POST',
        data
    })

//获取用户信息
export const getUserInfo = (params?: object) => 
      service.request({
            url: '/user/info',
            method: 'GET',
            params
      })

//站内信未读总数
export const unreadMessage = ()=>
	service.request({
		url:'/user/message_read_count',
		method:' POST'
	})

//上传视频
export const uploadVideo = (url:string, data: any) =>
    service.upload(url, {
        filePath: data.file,
        name: 'file',
        getTask: (task, options) => {
            //#ifndef APP-PLUS
            task.onProgressUpdate(debounce((res: any) => {
                uni.showLoading({
                    title: '上传中(' + res.progress + '%)',
                    mask: true
                });
                if (res.progress >= 100) {
                    setTimeout(() => uni.hideLoading(), 1000);
                }
            }, 100));
            //#endif 

            //#ifdef APP-PLUS
            let wait = plus.nativeUI.showWaiting("上传中(0%)");
            task.onProgressUpdate(debounce((res: any) => {
                wait.setTitle('上传中(' + String(res.progress) + '%)');
                if (res.progress >= 100) {
                    setTimeout(() => wait.close(), 1000);
                }
            }, 100));
            //#endif
        },
        formData: {
            ...data.params
        }

    })
    
//任务附件-下载
export const downLoadFile = (url: string) =>
    service.download(url, {
        getTask: (task, options) => {
            //#ifndef APP-PLUS
            task.onProgressUpdate(debounce((res: any) => {
                uni.showLoading({
                    title: '下载中(' + res.progress + '%)'
                })
                if (res.progress >= 100) {
                    uni.hideLoading();
                }
            }, 100));
            //#endif 

            //#ifdef APP-PLUS
            let wait = plus.nativeUI.showWaiting("下载中(0%)");
            task.onProgressUpdate(debounce((res: any) => {
                wait.setTitle('下载中(' + String(res.progress) + '%)');
                if (res.progress >= 100) {
                    wait.close();
                }
            }, 100));
            //#endif
        }
        
    })

