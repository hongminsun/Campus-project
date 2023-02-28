import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "@/router"
// 引入仓库
import store from '@/store'
// 定义全局组件  在入口文件注册一次后  在所有组件当中都可以使用
import TypeNav from "@/components/TypeNav"
import MyCarousel from "@/components/MyCarousel"
import MyPagination from "@/components/MyPagination"
import { Button, MessageBox } from "element-ui"

// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(MyCarousel.name, MyCarousel)
Vue.component(MyPagination.name, MyPagination)
Vue.component(Button.name, Button)
// element-ui注册组件的时候 还有一种写法  就是挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 引入MockServer.js------mock数据
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css";

// 统一接收api文件里面的全部请求函数
import * as API from '@/api'
import atm from "@/assets/1.gif"
import VueLazyLoad from "vue-lazyload"
Vue.use(VueLazyLoad, {
  // 懒加载默认图片
  loading: atm
})

new Vue({
  render: h => h(App),
  //全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由  KV一致 省略V
  router,
  // 注册仓库： 这时组件的实例对象上会多一个属性$store
  store
}).$mount('#app')
