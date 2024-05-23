// store 相关的代码
// 导入 vue
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'

import user from "./modlus/user.js"
// vuex也是vue的插件, 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

// 创建仓库 store
const store = new Vuex.Store({
    modules:{
        user
    }
})

// 导出仓库
export default store