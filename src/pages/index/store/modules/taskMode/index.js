const taskMode = {
  state: {
    mode: 'processing'
  },
  mutations: {
    SET_TASK_MODE: (state,mode) => {
      state.mode = mode;
    }
  },
  actions: {
    SetTaskMode({
      commit
    },newMode){
      commit('SET_TASK_MODE',newMode);
    }
  }
}

export default taskMode;