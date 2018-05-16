const topics = {
  state: {
    topicsList: {},
  },
  mutations: {
    SET_TOPICSLIST: (state, topicsList) => {
      state.topicsList = topicsList;
    }
  },
  actions: {
    SetTopicsList({
      commit
    }, newTopicsList) {
      commit('SET_TOPICSLIST', newTopicsList);
    }
  }
}
export default topics;
