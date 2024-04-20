// 创建实例时配置默认值
import axios from "axios";
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true // 允许发送认证信息（如 cookies）
});

export default myAxios
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("我要发请求了" ,config)
    return config;
}, function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response?.data?.code===40100){
        const redirectUrl:string = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // console.log("我要接受请求了",response)
    return response.data;

}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});