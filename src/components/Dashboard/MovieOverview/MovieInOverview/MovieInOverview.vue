<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Movie } from '@/types/';
import TrackedMoviesStore from '@/stores/TrackedMoviesStore';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
import RemoveMovieFromDashboard from './RemoveMovieFromDashboard/RemoveMovieFromDashboard.vue';
import MovieRating from './MovieRating/MovieRating.vue';

export default defineComponent({
  name: 'MovieInOverview',
  props: {
    movie: {
      type: Object as PropType<Movie>,
      default: {
        title: '',
        id: 0,
        backdrop_path: '',
        poster_path: '',
        overview: '',
        release_date: '',
        selected: false,
      },
    },
  },
  components: {
    RemoveMovieFromDashboard,
    MovieRating,
    ChevronDownIcon,
  },
  setup(props, { emit }) {
    const { movie } = props;

    let hover = false;

    const imagePath = 'https://image.tmdb.org/t/p/w185/';

    const toggleExpandedMovieInformation = () => {
      emit('toggleExpandedMovieInformation', movie);
      TrackedMoviesStore.dispatch('selectMovie', movie.id);
    };

    const removeOverlay = () => {
      setTimeout(() => {
        hover = false;
      }, 200);
    };

    return {
      hover,
      imagePath,
      toggleExpandedMovieInformation,
      removeOverlay,
    };
  },
});
</script>

<style scoped lang="scss">
  .movieInOverviewContainer {
    position: relative;
    height: 100%;
    img {
      height: 100%;
      width: 100%;
    }
    .overlay {
      position: absolute;
      background: #00000000;
      transition: background-color .2s;
      height: 100%;
      width: 100%;
      top: 0;
      display: flex;
      flex-direction: column;
      padding: 8px;
      .ratingContainer {
        opacity: 0;
        transition: opacity .2s;
      }
      .bottom {
        user-select: none;
        display: flex;
        align-self: flex-end;
        justify-content: center;
        width: 100%;
        padding-bottom: 8px;
        margin-top: auto;
        span {
          opacity: 0;
          cursor: pointer;
          padding: 0 8px;
          transition: transform .2s, color .2s, opacity .2s;
          &:hover {
            color: #ff6a00;
            transform: scale(1.5);
          }
          &.chevronClicked {
            transform: rotate(180deg);
            &:hover {
              transform: scale(1.5) rotate(180deg);
            }
          }
        }
      }
      &:hover {
          background: #000000b5;
        span, .ratingContainer {
          opacity: 1;
        }
      }
    }
  }
</style>

<template>
  <div
      class='movieInOverviewContainer'
      v-on:mouseover='hover = true'
      v-on:mouseleave='removeOverlay'
    >
    <img :src="imagePath + movie.poster_path" />
    <div class='overlay' v-if='hover'>
      <MovieRating
        :movie="movie" />
      <div class='bottom'>
        <RemoveMovieFromDashboard
          class="removeMovieHover"
          :movie="movie" />
        <ChevronDownIcon
          class='chevronHover'
          v-bind:class="{ chevronClicked: movie.selected }"
          @click='toggleExpandedMovieInformation' />
      </div>
    </div>
  </div>
</template>
