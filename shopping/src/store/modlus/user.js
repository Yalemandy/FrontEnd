// 用户相关的信息
import {setUserinfo,getUserinfo} from "@/utils/storage.js"
export default{
    // 开启命
    namespaced: true,
    state () {
      return {
        userInfo: getUserinfo()
      }
    },
    // 修改数据的方法
    mutations: {
        setUserInfo(state,value){
            state.userInfo.userId=value.userId
            state.userInfo.token=value.token


            setUserinfo(value)

        }
    },
    // 处理异步
    actions: {}
}