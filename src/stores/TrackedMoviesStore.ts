import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
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

type Rating = {
  value: number;
  id: number;
}

type RatingObject = {
  rating: number;
  movie: Movie;
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
        localforage.getItem<[]>('rating').then((ratings) => {
          const ratedMovesSorted = orderBy(ratings, [(rating: Rating) => rating.value], [ascOrder ? 'asc' : 'desc']);
          ratedMovesSorted.forEach((ratedMovie: Rating) => {
            trackedMovies.forEach((trackedMovie: Movie) => {
              if (ratedMovie.id === trackedMovie.id) trackedMoviesSorted.push(trackedMovie);
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

function addRating(ratingObject: RatingObject) {
  let initialRating = 0;
  const { movie } = ratingObject;

  localforage.getItem<Rating[]>('rating').then((value) => {
    if (value) {
      value.forEach((ratings: Rating, index) => {
        if (ratings.id === movie.id) initialRating = ratingObject.rating || ratings.value;
        if (ratings.id === movie.id) value.splice(index, 1);
      });
      value.push({ value: initialRating, id: movie.id });
      localforage.setItem('rating', value);
    }
  });
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
    addRating(state, ratingObject: RatingObject) {
      addRating(ratingObject);
    },
  },
});
