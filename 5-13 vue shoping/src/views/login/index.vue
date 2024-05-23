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
          <input
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
            v-model="mobile"
          />
        </div>
        <div class="form-item">
          <input
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
            v-model="picCode"
          />
          <img :src="picUrl" alt="" @click="getPic" v-if="picUrl" />
        </div>
        <div class="form-item">
          <input
            class="inp"
            placeholder="请输入短信验证码"
            type="text"
            v-model="numcode"
          />
          <button @click="getCode">
            {{
              second === totalsecond ? "获取验证码" : second + "秒后获取验证码"
            }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicApi, getNumCode, userLogin } from "@/api/login.js";
import { Toast } from "vant";
import { mapMutations } from "vuex";
// import { Toast } from "vant";
export default {
  name: "LoginPage",
  data() {
    return {
      picUrl: "", //图片的路径

      totalsecond: 6, //总的秒数
      second: 6, //当前的秒数

      timerId: null, //定时器的id

      picCode: "", //图形验证码,
      picKey: "", //图片的唯一标识
      mobile: 18917286702,

      numcode: null,

      //
    };
  },

  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    //  获取图片验证码相关的数据
    async getPic() {
      let PicMsg = await getPicApi();
      this.picUrl = PicMsg.base64;
      this.picKey = PicMsg.key;
    },
    // 表单校验函数
    validFn() {
      // 判断手机号
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        Toast("请检查手机号是否输入正确");
        return;
      }
      // 判断验证码
      if (!/^[A-Za-z0-9]{4}$/.test(this.picCode)) {
        Toast("请检查验证码是否输入正确");
        return;
      }
      return true;
    },

    // 获取短信验证码
    async getCode() {
      // 重复点击开启多个定时器  ---如果当前没有定时器 我们在开启这个定时器
      // 如果当前没有定时器开着 我们才允许开定时器

      // 表单校验， 手机号有  正确是否

      if (!this.validFn()) {
        return;
      }

      // second 为负数的问题
      if (this.timerId === null) {
        await getNumCode(this.picCode, this.picKey, this.mobile);
        this.numcode = 246810;
        //开启定时器
        this.timerId = setInterval(() => {
          this.second--;
          if (this.second < 1) {
            // 关闭定时器
            clearInterval(this.timerId);
            // 重置second
            this.second = this.totalsecond;

            // // 清除定时器id
            this.timerId = null;
          }
        }, 1000);
      }
    },
    // 登录
    async login() {
      // if (!this.validFn()) {
      //     return;
      // }

      // // 校验短信验证码
      // if(!/^\d{6}$/.test(this.numcode)){
      //   Toast("请检查短信验证码是否正确")
      //   return
      // }

      const a = await userLogin(this.numcode, this.mobile);
      // 数据存储到仓库中
      this.setUserInfo(a);
      // 跳转到首页
      this.$router.push("/");
      // 欢迎一下用户
      Toast("欢迎回来");
    },
  },
  created() {
    this.getPic();

    // Toast("坚决打击大家都觉得");

    // this.$toast.loading({
    //   message: "加载中...",
    //   forbidClick: true,
    // });

    this.$toast.success("成功文案");
  },
  destroyed() {
    clearInterval(this.timerId);
  },
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
