import { Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import permision from "./permission";

export const getToken = (tokenKey) => uni.getStorageSync(tokenKey)
export const setToken = (tokenKey: string, token: string) => uni.setStorageSync(tokenKey, token)
export const removeToken = (tokenKey: string) => uni.removeStorageSync(tokenKey)
export const setItem = (key: any, value: any) => uni.setStorageSync(key, value);
export const getItem = (key: any) => uni.getStorageSync(key);
export const removeItem = (key: any) => uni.removeStorageSync(key);
export const clearAll = () => uni.clearStorageSync();

/**
 * 随机字符串
 */
export const randomStr = () => {
    let chars= ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let res = "";
    let timestamp = new Date().getTime();
    chars.forEach(el => {
       res += chars[Math.ceil((Math.random()*10))]
    })
    return res
}

// 防抖
export const debounce = function (fn: any, wait: any) {   
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(context, args)
        }, wait);
    }
}




/**
 * 
 * @param  url 页面路由  auth 登录鉴权
 * 
 */
export const $redirect = (params:{url: any}) => {
    uni.redirectTo({
        url: params.url
    });
}

/**
 * 
 * @param delta 后退层级
 */
export const $navigateBack =  (delta = 1) => {
	uni.navigateBack({
		delta: delta,
		animationType: 'pop-out',
		animationDuration: 200
	})
}

/**
 * 
 * @param  url 页面路由  auth 登录鉴权
 */
export const $navigateTo = (pramas: {url: any}) => {
        uni.navigateTo({
            url: pramas.url,
            animationDuration: 200
        });
}

    
/**
 * 
 * @param url tabbar 跳转
 */
export const $switchTab = (params: {url: string}) => {
    uni.switchTab({
        url: params.url
    });
}

/**
 * 
 * @param pramas url tabbar 跳转
 */
export const $reLunch = (params: {url: string}) => {
    uni.reLaunch({
        url: params.url
    });
}




  /**
   * 判断平台是否为微信
   */
  export const isWechat = () => {
    var ua: any = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger') return true;
    return false;
  }

  
  export const $Toast = (pramas: any) => {
      
     //#ifdef APP-PLUS
        plus.nativeUI.toast(pramas.message);
     //#endif

      //#ifndef APP-PLUS 
	  uni.showToast({
            icon: 'none',
			title: pramas.message || 'Error',
			duration: 2000
	  })
	  //#endif
  }

  /**
   * 判断设备系统
   */
  export const { platform } = uni.getSystemInfoSync();

    /**
     * 判断IOS是否获得相册权限
     */
   export const requestIosPermission = (permisionID) => {
        var result = permision.judgeIosPermission(permisionID);
        if (result != true) {
            permision.gotoAppPermissionSetting();
        } 
        return result;
    }

     /**
     * 判断安卓是否获得相册权限
     */
   export const requestAndroidPermission =  async (permisionID) => {
        var result = await permision.requestAndroidPermission(permisionID);
        var strStatus;
        if (result == 1) {
            strStatus = "已获得授权";
        } else if (result == 0) {
            uni.showModal({
                content: permisionID + strStatus + "是否去打开",
                showCancel: false,
                success: (res) => {
                    if (res.confirm) {
                        permision.gotoAppPermissionSetting();
                    }
                },
            });
        } else {
            (strStatus = "被永久拒绝权限"),
            uni.showModal({
                content: permisionID + strStatus,
                showCancel: false,
            });
        }
        return result;
    }



//创建tabbar的遮罩
export function isNowPage(route){
    var pages = getCurrentPages();
    var pageRoute = pages[pages.length-1].route;
    if(pageRoute == route){
        return true;
    }else{
        return false;
    }
}

/**
 * 展示等待图标
 */
export const $showLoading = () =>{
    return true
}

/**
 * 关闭等待图标
 */
export const $hideLoading = () =>{
    setTimeout(()=>{
        return false
    },500)
}

/**
 * 截掉价格小数点后的位数
 */
export const sliceDecimal = (str: any) => {
     let arr = str.split('.');
     return '.' + arr[1];
}