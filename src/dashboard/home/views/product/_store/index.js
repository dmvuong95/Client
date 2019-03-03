import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    currentProduct: {
      name: '',
      buyCost: 0,
      saleCost: 0,
      remainQuantity: 0
    }
  },
  getters: {
    currentProduct: state => state.currentProduct
  },
  mutations: {
    CHANGE_CURRENT_PRODUCT (state, currentProduct) {
      state.currentProduct = currentProduct
    }
  },
  actions: {
    changeCurrentProduct ({commit}, currentProduct) {
      commit('CHANGE_CURRENT_PRODUCT', currentProduct)
    }
  }
})
