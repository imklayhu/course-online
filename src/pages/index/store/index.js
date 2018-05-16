import Vue from "vue"
import Vuex from "vuex"

import user from './modules/users/index';
import taskMode from './modules/taskMode/index';
import topics from './modules/topics/index';
import {Icon} from 'iview'
Vue.component('Icon',Icon);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    taskMode,
    topics
  },
  // getters
})

export default store;