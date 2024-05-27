<template>
  <div class="prodetail">
    <van-nav-bar
      fixed
      title="商品详情页"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img :src="item.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }} / {{ images.length }}
        </div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ list.goods_price_min }}</span>
          <span class="oldprice">￥{{ list.line_price_min }}</span>
        </div>
        <div class="sellcount">已售{{ list.stock_total }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ list.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ rowslist.length }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /></div>
      </div>
      <div class="comment-list">
        <div
          class="comment-item"
          v-for="item in rowslist"
          :key="item.comment_id"
        >
          <div class="top">
            <img
              :src="
                item.user.avatar_url ||
                'http://smart-shop.itheima.net/uploads/10001/20230321/a0db9adb2e666a65bc8dd133fbed7834.png'
              "
              alt=""
            />
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate
              :size="16"
              :value="item.score"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="list.content"></div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/home')">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart" @click="gocart">
        <span class="num" v-if="cartTotal > 0">{{ cartTotal }}</span>
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div
        class="btn-add"
        @click="
          isShow = true;
          type = 'cate';
        "
      >
        加入购物车
      </div>
      <div
        class="btn-buy"
        @click="
          isShow = true;
          type = 'buy';
        "
      >
        立刻购买
      </div>
    </div>
    <van-action-sheet
      v-model="isShow"
      :title="type === 'cart' ? '加入购物车' : '立刻购买'"
    >
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="list.goods_image" />
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ list.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ list.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <div class="num-box">
            <span>数量</span>
            <GoodCount
              :goodsnum="goodsnum"
              @delgoodsnum="delgoodsnum"
              @addgoodsnum="addgoodsnum"
            ></GoodCount>
          </div>
        </div>
        <div class="showbtn" v-if="list.stock_total > 0">
          <div class="btn" v-if="type !== 'cart'" @click="goodsCart()">
            加入购物车
          </div>
          <div class="btn now" v-else>立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { addCart } from "@/api/cart.js";
import { getGoodsDetail, getGoodsComment } from "@/api/shop.js";
import GoodCount from "@/components/GoodCount.vue";
import { getUserinfo } from "@/utils/storage.js";
export default {
  name: "ProDetail",
  components: {
    GoodCount,
  },
  data() {
    return {
      images: [],
      list: {},
      current: 0,
      limit: 5,
      rowslist: {},
      isShow: false,
      type: "cate", // buy
      goodsnum: 1,
      cartTotal:0,
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    delgoodsnum(value) {
      this.goodsnum = value;
    },
    addgoodsnum(value) {
      this.goodsnum = value;
    },
    async goodsCart() {
      let cart = getUserinfo();
      if (!cart.token) {
        this.$dialog
          .confirm({
            title: "温馨提示",
            message: "此时需要先登录才能继续操作哦",
            confirmButtonText: "去登录",
            cancelButtonText: "再逛逛",
          })
          .then(() => {
            this.$router.push({
              path: "/login",
              query: {
                allpath: this.$route.fullPath,
              },
            });
          })
          .catch(() => {
            return;
          });
      } else {
        // 已经登录了
        let ab = await addCart(this.goodsid, this.goodsnum,this.list.skuList[0].goods_sku_id);
        console.log(ab);
        this.cartTotal = ab.cartTotal
        this.isShow = false;
      }
    },
    gocart(){
      this.$router.push('/cate')
    }
  },
  async created() {
    let a = await getGoodsDetail(this.goodsid);
    console.log(a);
    this.list = a.detail;
    this.images = a.detail.goods_images;

    let b = await getGoodsComment(this.goodsid, this.limit);
    this.rowslist = b.list;
  },
  computed: {
    goodsid() {
      return this.$route.query.goodsId;
    },
  },
};
</script>

<style lang="less" scoped>
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn,
  .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home,
    .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}
</style>