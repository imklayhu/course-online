import Vue from "vue"
import Vuex from "vuex"

import user from './modules/users/index'
import {Icon} from 'iview'
Vue.component('Icon',Icon);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  // getters
})

export default store;