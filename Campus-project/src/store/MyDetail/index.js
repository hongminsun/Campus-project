import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"
// 封装游客临时身份模块uuid————生成一个随机字符串（不能再改）
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo(context, skuid) {
        let result = await reqGoodsInfo(skuid)
        if (result.code == 200) {
            context.commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的结果
        // 加入购物车后 服务器不用给用户返回结果
        // 所以也不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 当前的这个函数返回的是一个Promise
        if (result.code == 200) {
            return 'ok'
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
// 简化数据而生
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        // state.goodInfo初始状态为空对象  空对象的categoryView属性值为undefined
        // 当前计算出的 categoryView属性值至少是一个空对象
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || {};
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}