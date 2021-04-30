import axios from 'axios'
axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 请求拦截
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('heimaback_token')
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


//暴露
export default axios