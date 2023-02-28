// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routers"
import store from '@/store'
// 使用插件
Vue.use(VueRouter)



// 配置路由
let router = new VueRouter({
    // kv一致省略v
    routes,
    // 滚动行为
    scrollBehavior(to, from, savePosition) {
        return { y: 0 };
    }
})

export default router;

// 全局守卫:前置守卫
router.beforeEach(async (to, from, next) => {
    // 用户登陆了  才会有token  未登陆一定没token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        // 用户登陆了就不能去login了
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            // 登陆去的不是login
            // 如果用户信息已有
            if (name) {
                next()
            } else {
                // 如果没有用户信息  派发action  让仓库存储用户信息  再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了 获取不到用户信息
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')

                }
            }
        }
    } else {
        // 未登录不能去交易相关界面、不能去支付相关界面、不能去个人中心
        // 未登录去上面的这些路由时  去到登陆页面
        let toPath = to.path
        if (toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把未登录的时候想去而没有去成的信息 存储在地址栏中 （query参数）
            next('/login?redirect=' + toPath)
        } else {
            // 去的路由不是上面的就可以（home|search|shopCart）
            next()
        }
    }
})


