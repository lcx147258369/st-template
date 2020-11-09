/**
 * 
 * @param date 时间转时间戳
 */
export const timeTransStamp = function (date: any) {
      let str = date.getTime()
      return str
}

 /**
 * 时间戳转时间戳，具体到秒
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

/**
 * 
 * @param str 时间戳转时间，具体到天
 */
export const stampTransDay = function (str: any) {
      var date = new Date(str * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
      return Y + M + D
}


