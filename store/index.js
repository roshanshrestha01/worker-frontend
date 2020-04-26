export const state = () => ({
  workOrders: [],
  workers: [],
  filteredWorkOrders: null,
  searchWord: null
})


export const mutations = {
  setWorkOrders(state, payload) {
    state.workOrders = payload
  },
  reverseWorkOrderState(state) {
    state.workOrders.reverse()
    if (state.filteredWorkOrders)
      state.filteredWorkOrders.reverse()
  },
  addWorker(state, payload) {
    state.workers.push(payload)
  },
  filteredWorkOrders(state, word) {
    if (!(word) || word === '{}') {
      state.searchWord = null
      state.filteredWorkOrders = null
    } else {
      state.searchWord = word
      word = word.trim().toLowerCase()
      const workers = state.workers.filter((worker) => {
        return worker.name.toLowerCase().includes(word)
      })
      const workerIds = workers.map(worker => worker.id)
      state.filteredWorkOrders = state.workOrders.filter((workOrder) => {
        return workerIds.includes(workOrder.workerId)
      })
    }
  },
}


export const actions = {
  setWorker({commit, state}, worker) {
    commit('addWorker', worker)
  },
  reverseWorkOrders({commit}) {
    commit('reverseWorkOrderState')
  },
  setWorkOrders({commit, dispatch, getters, state}, orders) {
    commit('setWorkOrders', orders)
  },
  filteredWorkOrders({commit}, word) {
    commit('filteredWorkOrders', word)
  }
}


export const getters = {
  getWorker: (state) => (id) => {
    return state.workers.find(worker => worker.id === id)
  },
  getWorkOrders: (state) => state.workOrders,
  getFilteredWorkOrders: (state) => state.filteredWorkOrders
}
