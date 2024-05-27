<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" />
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" />
          <img :src="picUrl" alt @click="GetPic" v-if="picUrl" />
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" />
          <button @click="Getcode" > {{ second === totalsecond? "获取验证码" : second + "秒后重试" }}
          </button>
        </div>
      </div>

      <div class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { GetPica } from "@/api/login.js";

import { Toast } from "vant";

export default {
  name: "LoginPage",
  data() {
    return {
      picUrl: "", // 验证码图片
      picKey: "", // 验证码key -- 唯一标识

      second: 60,// 当前验证码倒计时 
      totalsecond: 60,  // 验证码倒计时总秒数 

      timeid: null // 验证码倒计时定时器
    };
  },
  created() {
    this.GetPic();
    Toast("登录页面");

    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
  },
  methods: {
    async GetPic() {
      const res = await GetPica();
      this.picUrl = res.base64;
      this.picKey = res.key;
    },
    // 获取验证码
    Getcode(){ 
      // tiem開啟的情況下只能啟動一次
      if(this.timeid === null){
        this.timeid =  setInterval(()=>{
            if(this.second > 0)
            {
              this.second--;
            }
            if(this.second < 1)
            {
              clearInterval(this.timeid);
              this.second = this.totalsecond;
              this.timeid = null;
            }
          },5)
      }
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>