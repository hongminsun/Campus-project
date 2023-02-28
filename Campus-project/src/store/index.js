import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex);

import home from './MyHome'
import search from './MySearch'
import detail from './MyDetail'
import shopcart from './MyShopCart'
import user from './MyUser'
import trade from './MyTrade'
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
})