<template>
  <div class="cart">
        
    <van-nav-bar title="购物车" fixed />
    <!-- 购物车开头 -->
    <div class="cart-title">
      <span class="all">共<i>{{ CartTotal }}</i>件商品</span>
      <span class="edit">
        <van-icon name="edit" />
        编辑
      </span>
    </div>

    <!-- 购物车列表 -->
    <div class="cart-list">
      <div class="cart-item" v-for="item in cartList" :key="item.id">
        <van-checkbox :value="item.checked" @click="handleCheck(item.id)"></van-checkbox>
        <div class="show">
          <img :src="item.goods.goods_image" >
        </div>
        <div class="info">
          <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
          <span class="bottom">
            <div class="price">¥ <span>{{item.goods.goods_price_min}}</span></div>
            <div class="count-box">
              <!-- <button class="minus">-</button>
              <input class="inp" :value="4" type="text" readonly>
              <button class="add">+</button> -->
              <GoodCount :goodsnum="item.goods_num"></GoodCount>
            </div>
          </span>
        </div>
      </div>
    </div>

    <div class="footer-fixed">
      <div  class="all-check">
         <!-- @click="handleCheck" -->
        <van-checkbox  icon-size="18" :value="changoodsAllchecked" @click="handleCheck1" 
        @delgoodsnum="delgoodsnum(value=> {delgoodsnum(value,item.goods_id, item.goods_sku_id)})"
         @addgoodsnum="addgoodsnum"></van-checkbox>
        全选
      </div>

      <div class="all-total">
        <div class="price">
          <span>合计：</span>
          <span>¥ <i class="totalPrice">{{ ifischecked }}</i></span>
        </div>
        <div v-if="true" class="goPay">结算({{ ifisNum }})</div>
        <div v-else class="delete">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodCount from "@/components/GoodCount.vue";
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex'
export default {
  name: 'CartPage',

  components:{
    GoodCount
  },
  methods:{
    ...mapActions('cart',['getCartsList','changoodsChecked2']),
    ...mapMutations('cart',['changoodschecked','chanceAllgoodschecked1']),
    handleCheck(id){
      this.changoodschecked(id)
    },
    handleCheck1(){
      this.chanceAllgoodschecked1(!this.changoodsAllchecked)
    }
  },
  created(){
    this.getCartsList()
  },
  computed:{
    ...mapState('cart',['cartList']),
    ...mapGetters('cart',['CartTotal','ifischecked','ifisNum','changoodsAllchecked'])
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}
</style>