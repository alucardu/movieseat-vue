import Vue from 'vue';
import Vuex from 'vuex';
import { orderBy } from 'lodash';
import localforage from 'localforage';

Vue.use(Vuex);

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

type SortingConfiguration = {
  sortType: string;
  ascOrder: boolean;
}

function returnSortType(movie: Movie, selectedSortType: string) {
  switch (selectedSortType) {
    case 'Release date':
      return movie.release_date;
    case 'Title':
      return movie.title;
    default:
      return '';
  }
}

async function sortTrackedMovies(state: any, movieList: Movie[]) {
  let sortType = '';
  let ascOrder = false;
  let trackedMoviesSorted: Movie[] = [];

  await localforage.getItem<SortingConfiguration>('sortingConfiguration').then((value) => {
    if (value) {
      sortType = value.sortType;
      ascOrder = value.ascOrder;
      const trackedMovies = movieList;
      trackedMoviesSorted = orderBy(trackedMovies, [
        (movie) => returnSortType(movie, sortType)], [ascOrder ? 'asc' : 'desc']);
      state.commit('populateTrackedMovies', trackedMoviesSorted);
    }
  });
  return trackedMoviesSorted;
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
  actions: {
    sortTrackedMovies(state, movieList) {
      sortTrackedMovies(state, movieList);
    },
    addMovieToTrackedMovies(state, movie) {
      const trackedMovieList = state.getters.list;
      trackedMovieList.push(movie);
      sortTrackedMovies(state, trackedMovieList);
    },
  },
});
