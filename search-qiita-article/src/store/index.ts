import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    qiitaDataSet: {}
  },
  getters: {
    getQiitaDataSet: (state) => state.qiitaDataSet
  },
  mutations: {
    mutateQiitaApi(state, payload){
      state.qiitaDataSet = payload
    }
  },
  actions: {
    commitQiitaApi(store, payload){
      return axios.get('https://qiita.com/api/v2/items', payload )
      .then(response => {
        store.commit('mutateQiitaApi', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
})
