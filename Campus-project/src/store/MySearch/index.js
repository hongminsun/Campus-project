import { reqGetSearchInfo } from "@/api";


// MySearch 模块的小仓库
const state = {
    searchList: {}
};
const actions = {
    // 获取search模块的数据
    async getSearchList(context, params = {}) {
        // params形参  是当用户派发action时 第二个参数传递过来的，至少是一个空对象
        // params={} 默认参数 传了用传的  没传用这个  也就是空的
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            context.commit('GETSEARCHILIST', result.data);
        }
    }
};
const mutations = {
    GETSEARCHILIST(state, searchList) {
        state.searchList = searchList
    }
};
// 用于计算属性   在项目中主要用来简化仓库中的数据
const getters = {
    goodsList(state) {
        // 若没网则会返回undefined  为此需要给个备案  空数组[]
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        // 数据库缺失 我自己补的数据
        let a = []
        a[0] = { tmId: 1, tmName: "小米" }
        a[1] = { tmId: 2, tmName: "苹果" }
        return a;

    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}