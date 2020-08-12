import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

export default new Vuex.Store({
  state: {
    trackedMovieList: [] as Movie[],
  },
  mutations: {
    populateTrackedMovies(state, payload) {
      state.trackedMovieList = payload;
    },
    addMovieToTrackedMovies(state, payload) {
      state.trackedMovieList.push(payload);
    },
    removeMovieFromTrackedList(state, payload) {
      state.trackedMovieList = payload;
    },
  },
  getters: {
    list(state) {
      return state.trackedMovieList;
    },
  },
});
