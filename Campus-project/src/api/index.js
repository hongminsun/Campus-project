// 对API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax"
// 三级联动的接口 :  /api/product/getBaseCategoryList  get类型  无参数

export const reqCategoryList = () => {
    // 发请求：axios发请求返回结果为Promise对象 需要return
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 获取banner （Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据  地址：/api/list  请求方式：post
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
// }

// 函数需要像外部传递参数
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params })
// 获取产品详细信息的接口  URL：/api/item/{skuId}  请求方式:get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: `get` });
// 将产品添加到购物车中(获取更新某一个产品的个数)
// /api/cart/addToCart/{skuId}/{skuNum}  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: `post` })
// 购物车列表数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
// 删除购物车产品的接口
//URL：/api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
// 修改商品的选中状态
// URL:/api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
// 获取验证码
// URL:/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 注册
// URL:/api/user/passport/register method:post  phone code password
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })
// 登陆
// URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })
// 获取用户信息
// URL：/api/user/passport/auth/getUserInfo   method:get
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })
// 退出登录
// URL: /api/user/passport/logout method:get
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' })
// 获取用户地址信息
// URL：/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })
// 获取商品清单
// URL：/api/order/auth/trade
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' })
// 提交订单的接口
// URL：/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
// 获取订单支付信息
// URL：/api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'post' })
// 获取支付订单状况
// URL：/api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 获取个人中心数据
// URL: /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })


