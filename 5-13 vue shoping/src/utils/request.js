// 二次封装的axios    基地址  请求延时  请求拦截 响应拦截
import axios from 'axios'
import { Toast } from 'vant';

const request = axios.create({
    baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 转圈
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    const res=response.data
    // 判断一下状态码是否是200  如果是200代表成功了  如果不是200就代表失败了
   
    if(res.status!==200){
      // 失败了提示一下用户失败的原因
      Toast(res.message)
      // 抛出一个异常
      return Promise.reject(res.message)
    }

    // 停止转
    Toast.clear()

    return res.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default request