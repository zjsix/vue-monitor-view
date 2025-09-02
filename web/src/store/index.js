
import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/api'

Vue.use(Vuex)

const state = {
    username: '',
    per: false,
}

const getters = {
    username: (state) => state.username,
    per: (state) => state.per
}

const mutations = {
    SET_NAME: (state, username) => {
        state.username = username
    },
    SET_PER: (state, per) => {
        state.per = per
    },
    SET_ROUTER: (state, router) => {
        state.router = router
    }
}

const actions = {
    getInfo({ commit }) {
        return new Promise(async (reslove, reject) => {
            try {
                const res = await getUserInfo()
                commit('SET_NAME', res.data.username)
                commit('SET_PER', res.data.isAdmin)
                if (res.data.isAdmin) {
                    commit('SET_ROUTER', [
                        { title: "日志查看", path: "/index/list" },
                        { title: "用户管理", path: "/index/user" },

                    ])
                } else {
                    commit('SET_ROUTER', [
                        { title: "日志查看", path: "/index/list" },
                    ])
                }
                reslove()
            } catch (e) {
                reject()
            }
        })
    },
    quit({ commit }) {
        localStorage.setItem('token', '')
        commit('SET_NAME', '')
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
