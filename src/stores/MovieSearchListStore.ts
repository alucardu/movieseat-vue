import Vue from 'vue';
import Vuex from 'vuex';
import { orderBy } from 'lodash';

Vue.use(Vuex);

type Movie = {
  title: string;
  release_date: string;
  id: number;
}

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
