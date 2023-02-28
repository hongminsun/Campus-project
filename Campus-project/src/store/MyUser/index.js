// 登陆与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token';
// MyHome 模块的小仓库
const state = {
    code: '',
    // token: localStorage.getItem('TOKEN'),
    token: getToken() || '',
    userInfo: {},
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 返回验证码   但正常情况后台会把验证码发送到手机上
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登陆(token)
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发token 是用户唯一标识符
        // 将来经常通过带token 找服务器要用户信息进行展示
        if (result.code == 200) {
            // 用户已经登陆成功且获取到token
            commit("USERLOGIN", result.data.token);
            // 持久化存储token
            // localStorage.setItem("TOKEN", result.data.token)
            setToken(result.data.token);
            return 'ok'
        } else {

        }
    },
    // 获取用户信息 
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return 'ok'
        }
    },
    // 退出登陆
    async userLogout({ commit }) {
        // 只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除本地的数据
    CLEAR(state) {
        // 把仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        // 本地存储清空
        removeToken();
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}