import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
Vue.use(Vuex)
Vue.use(VueCookies)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(window.$cookies.get('isCollapse') || false)
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    CHANGE_COLLAPSE (state, isCollapse) {
      state.isCollapse = isCollapse
    }
  },
  actions: {
    changeIsCollapse ({commit}, isCollapse) {
      commit('CHANGE_COLLAPSE', isCollapse)
    }
  }
})
