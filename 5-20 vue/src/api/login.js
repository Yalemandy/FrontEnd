// 登录相关的请求

import request from '@/utils/request.js'

// 获取图像验证码
export const getPicApi=()=>{
  return  request.get("/captcha/image");
}


// 获取短信验证码
export const getNumCode=(captchaCode,captchaKey,mobile)=>{
 return request.post('/captcha/sendSmsCaptcha',{
    form: {
      captchaCode: captchaCode,
      captchaKey: captchaKey,
      mobile: mobile
    }
  })
}

// 登录请求
export const userLogin=(smsCode,mobile)=>{
 return request.post('/passport/login',{
    form: {
      smsCode: smsCode,
      mobile: mobile,
      isParty: false,
      partyData: {}
    }
  })
}