// 登录相关的请求

import request from '@/utils/request.js'


export const getOrderList = ()=>{
    return request.get('/address/list')
}