import Vue from 'vue';
import { Movie, RatingObject, SortingConfiguration } from '@/types/';
import Vuex, { ActionContext } from 'vuex';
import { orderBy } from 'lodash';
import localforage from 'localforage';

Vue.use(Vuex);

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

async function sortTrackedMovies(state: ActionContext<{
      trackedMovieList: Movie[];
    }, {
      trackedMovieList: Movie[];
    }>, movieList: Movie[]) {
  let sortType = '';
  let ascOrder = false;
  let trackedMoviesSorted: Movie[] = [];

  await localforage.getItem<SortingConfiguration>('sortingConfiguration').then((value) => {
    if (value) {
      sortType = value.sortType;
      ascOrder = value.ascOrder;
      const trackedMovies = movieList;

      if (value.sortType === 'Rating') {
        localforage.getItem<RatingObject[]>('rating').then((ratingArray) => {
          const ratedMovesSorted = orderBy(ratingArray, [(rating: RatingObject) => rating.rating], [ascOrder ? 'asc' : 'desc']);
          ratedMovesSorted.forEach((ratedMovie: RatingObject) => {
            trackedMovies.forEach((trackedMovie: Movie) => {
              if (ratedMovie.movie.id === trackedMovie.id) trackedMoviesSorted.push(trackedMovie);
            });
          });
        });
      } else {
        trackedMoviesSorted = orderBy(trackedMovies, [
          (movie) => returnSortType(movie, sortType)], [ascOrder ? 'asc' : 'desc']);
      }
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
    selectMovie(state, id: number) {
      state.trackedMovieList.forEach((movie) => {
        movie.selected = movie.selected ? false : movie.id === id;
      });
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
    selectMovie({ commit }, id: number) {
      commit('selectMovie', id);
    },
  },
});
