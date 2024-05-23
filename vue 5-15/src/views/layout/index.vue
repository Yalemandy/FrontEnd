<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#f84d4d" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cate" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="contact-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "MyLayout",
  data() {
    return {
      active: 1,
    };
  },
  components: {},
};
</script>

<style></style>
