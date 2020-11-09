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

