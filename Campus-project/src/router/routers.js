// 引入路由组件
// import MyHome from "@/pages/MyHome"
import MyLogin from "@/pages/MyLogin"
import MyRegister from "@/pages/MyRegister"
import MySearch from "@/pages/MySearch"
import MyDetail from "@/pages/MyDetail"
import MyAddCartSuccess from "@/pages/MyAddCartSuccess"
import MyShopCart from "@/pages/MyShopCart"
import MyTrade from '@/pages/MyTrade'
import MyPay from '@/pages/MyPay'
import MyPaySuccess from '@/pages/MyPaySuccess'
import MyCenter from "@/pages/MyCenter"
// 引入二级路由
import MyOrder from "@/pages/MyCenter/MyOrder"
import GroupOrder from "@/pages/MyCenter/GroupOrder"

/* 打包构建应用时 js包会变的非常大，影响页面加载
如果我们能把不同路由对应的组件分割成不同的代码块  然后当路由被访问的时候才加载对应组件  这样就更高效了
*/

// 路由懒加载
// const foo = () => {
//     return import("@/pages/MyHome")
// }

// 路由的配置信息
export default [
    {
        path: "/center",
        name: "mycenter",
        component: MyCenter,
        meta: {
            show: true
        },
        // 二级路由
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: "/center/myorder"
            }
        ]
    }, {
        path: "/paysuccess",
        name: "mypaysuccess",
        component: MyPaySuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/pay",
        name: "mypay",
        component: MyPay,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            } else { }
            next(false)
        },
    },
    {
        path: "/trade",
        name: "mytrade",
        component: MyTrade,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: "/shopcart",
        name: "shopcart",
        component: MyShopCart,
        meta: {
            show: true
        }
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: MyAddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/detail/:skuid",
        component: MyDetail,
        meta: {
            show: true
        }
    },
    {
        path: "/home",
        component: () => import("@/pages/MyHome"),
        meta: {
            show: true
        }
    },
    {
        path: "/login",
        component: MyLogin,
        meta: {
            show: false
        }
    },
    {
        path: "/register",
        component: MyRegister,
        meta: {
            show: false
        }
    },
    {
        path: "/search/:keyword?",
        component: MySearch,
        meta: {
            show: true
        },
        name: "search",
        // 路由组件能不能传递props数据？
        // 可以 有三种写法
        // 布尔值写法：  只能传params参数
        // props: true,
        // 对象写法  额外给路由组件传递一些props
        // props：{a:1,b:2}，
        // 函数写法：可以传params query
        props: ($route) => {
            return { keyword: $route.params.keword, k: $route.query.k }
        }
    },
    // 路由重定向
    {
        path: "*",
        redirect: '/home'
    }
]