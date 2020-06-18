import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    InfoScoreComp: [],
    GlobalScore: [],
    InfoDebt: []
  },
  mutations: {
    InfoAPIcomp: function (state, Companys) {
      state.InfoScoreComp.push(Companys)
    },
    InfoGlobalScore: function (state, score) {
      state.GlobalScore.push(score, state)
    },
    InfoDebt: function(state, info){
      state.InfoDebt.push(info)
    }
  },
  actions: {
  },
  modules: {
  }
})
