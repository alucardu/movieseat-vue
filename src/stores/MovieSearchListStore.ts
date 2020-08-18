import Vue from 'vue';
import Vuex from 'vuex';
import { orderBy } from 'lodash';
import { Movie } from '@/types/';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchList: [] as Movie[],
  },
  mutations: {
    createList(state, payload) {
      state.searchList = orderBy(payload.results, [(movie: Movie) => movie.release_date], ['desc']);
    },
    clearList(state, emptyArray) {
      state.searchList = emptyArray;
    },
  },
  getters: {
    list(state) {
      return state.searchList;
    },
  },
});
