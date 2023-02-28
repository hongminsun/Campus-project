// 对 axios 进行二次封装
import axios from "axios"

// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";


// 1.利用axios对象的create方法，创建一个axios实例
// 2. requests就是axios，只不过稍微配置了一下
const requests = axios.create({
    // 配置对象
    // 基础路径
    baseURL: "/mock",
    // 请求超时
    timeout: 5000,
});

// 请求拦截器： 在发请求之前，请求拦截器可以检测到，并在请求发出去之前做一些业务逻辑
requests.interceptors.request.use((config) => {
    //进度条开始动
    nprogress.start()
    // config:配置对象， 对象里面有一个headers请求头属性 很重要
    return config;
});


// 响应拦截器: 服务器响应回来的数据可以检测到，并做一些业务逻辑
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done()
    return res.data;
}, (error) => {
    return Promise.reject(new Error('faile'))
});


// 对外暴露
export default requests