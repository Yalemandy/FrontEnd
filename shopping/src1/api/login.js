// 登录相关的请求

import request from "@/utils/request.js";

export const GetPica=()=>{
    return request.get("/captcha/image");
}


















