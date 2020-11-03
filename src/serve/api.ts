import service from './request';
import { debounce } from '@/utils/util';

//上传图片
export const uploadPic = (data: any) =>
    service.upload(`/system?do=upload_pic`, {
        filePath: data.file,
        name: 'file',
        formData: {
            type: data.type
        }
    })

//上传视频
export const uploadVideo = (data: any) =>
    service.upload(`/system?do=upload_video`, {
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
            type: data.type,
            ...data.params
        }

    })
    
// 上传视频压缩包
export const uploadVideoCompress = (data: any) =>
    service.upload(`/system?do=upload_video_by_compress`, {
        filePath: data.file,
        name: 'file',
        getTask: (task, options) => {
            task.onProgressUpdate(debounce((res: any) => {
                uni.showLoading({
                    title: '上传中(' + res.progress + '%)',
                    mask: true
                });
                if (res.progress >= 100) {
                    setTimeout(() => uni.hideLoading(), 1000);
                }
            }, 100));
        },
        formData: {
            type: data.type,
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