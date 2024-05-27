
import {getCartList,delCartOder} from "@/api/cart.js";
export default{
    // 开启命
    namespaced: true,
    state () {
      return {
        cartList:[],
        delCartorderList:[]
      }
    },
    // 修改数据的方法
    mutations: {
       
      setCartlist(state,value){
        state.cartList = value
      },
      changoodschecked(state,id){
        state.cartList.forEach(item => {
          if(item.id == id)
          {
            item.checked =!item.checked
          }
        })
        return state.cartList
      },
      chanceAllgoodschecked1(state,value){
        state.cartList.forEach(item => {
          item.checked = value
        })
      }
      
    },
    // 处理异步
    actions: {
      // 获取购物车列表
      async getCartsList(context){
       let a= await getCartList()

       // console.log(a);
       a.list.forEach(item => {
         item.checked = true
       })
       context.commit('setCartlist',a.list)
      },
      async changoodsChecked2(context,obj){
        await context.getCartsList

        console.log(obj);
      },
      async delCartOrder(context){

        const selgoods = context.getters.selgoods;

        const selgoodsIds = selgoods.map(item => item.id)

        await delCartOder(selgoodsIds)

        context.dispatch('getCartsList')
      }
    },

    // 获取数据的方法
    getters: {

      CartTotal(state){
        let total = 0
        state.cartList.forEach(item => {
          total += item.goods_num
        })
        return total
      },

      // 获取选中的商品的总价格
      ifischecked(state){
        let price = 0;
        state.cartList.forEach(item => {
          if(item.checked){
            price += item.goods.goods_price_min * item.goods_num
          }
        })
        return price.toFixed(2)
      },
      // 获取选中的商品的总数量
      ifisNum(state){
        let isnum = 0;
        state.cartList.forEach(item => {
          if(item.checked){
            isnum += item.goods_num
          }
        })
        return isnum
      },
      changoodsAllchecked(state){
        return state.cartList.every(item => item.checked === true)
         // {if(item.checked === false){
         //   item.checked = true
         // }else{
         //   item.checked = false
         // }}
     },
     selgoods(state){
      return  state.cartList.filter(item => item.checked)
     }
    }
}