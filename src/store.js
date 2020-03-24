import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const url = "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData"

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  fetchedData: []
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  updateFetchedData (state, fetchedData){
    state.fetchedData = fetchedData
  }
}

const actions = {
  fetchData ({commit}) {
    axios.get(url).then((response) => {
      commit('updateFetchedData', response)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})