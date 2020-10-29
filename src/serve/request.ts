// @ts-nocheck
import { UserModule } from '@/store/modules/user';
import Request from '@/utils/luch-request/index.js';



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

        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptors
service.interceptors.response.use(
    (response) => {
        
        return response.data;

    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
