import Vue from 'vue'
import Vuex from 'vuex'
import website from '@/const/website'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    website: website,
    access_token: ''
  },
  mutations: {
    SET_TOKEN: (state, h) => {
      state.access_token = h;
    },
  },
  actions: {
  },
  modules: {
  }
})
