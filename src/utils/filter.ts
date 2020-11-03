/**
 * 
 * @param value 给图片加上协议
 */
export const protocal = (value: string) => {
    if(value) { 
        const str = value.split('//');
        if(str[0] == '' || str[0] == 'http:') {
            return 'https://' + str[1];
        } else if(str[0] == 'https') {
            return value;
        }
    }
    return value;
}

/**
 * 
 * @param value cdn上的资源路径
 */
export const serveCdn = (value: string) => {
    return process.env.VUE_APP_IMG + value;
}

 /**
 * 时间戳转时间
 * @param { String } str 
 */
export const stampTransTime = (str: any) => {
    var date = new Date(str * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + ' ' + h + m + s
}