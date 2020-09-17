<script lang="ts">
import { Movie, RatingObject } from '@/types/';
import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue';
import StarIcon from 'vue-material-design-icons/Star.vue';
import StarHalfFullIcon from 'vue-material-design-icons/StarHalfFull.vue';
import localforage from 'localforage';
import SnackbarStore from '@/stores/SnackbarStore';
import TrackedMoviestStore from '@/stores/TrackedMoviesStore';
import {
  defineComponent, onMounted, PropType, reactive, ref,
} from '@vue/composition-api';

export default defineComponent({
  name: 'MovieRating',
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
    StarOutlineIcon,
    StarIcon,
    StarHalfFullIcon,
  },
  setup(prop) {
    const storedRating = ref(0);
    const { movie } = prop;

    const fullStar = reactive({
      list: [
        { value: false },
        { value: false },
        { value: false },
        { value: false },
        { value: false },
        { value: false },
      ],
    });

    const halfStar = [false, false, false, false, false, false];

    const displayRating = (rating: number) => {
      for (let index = 1; index <= 5; index++) {
        fullStar.list[index].value = false;
        halfStar[index] = false;
        if (index <= rating) fullStar.list[index].value = true;
        if (!Number.isInteger(rating)) {
          if (index < Math.round(rating)) fullStar.list[index].value = true;
          if (index === Math.round(rating)) halfStar[index] = true;
        }
      }
    };

    const addRating = (rating: number) => {
      storedRating.value = rating;
      let initialRating = 0;
      initialRating = rating > 0 ? initialRating = rating : 0;

      localforage.getItem<RatingObject[]>('rating').then((ratingArray) => {
        if (ratingArray) {
          ratingArray.forEach((ratings: RatingObject, index) => {
            if (ratings.movie.id === movie.id) {
              initialRating = rating || ratings.rating;
              ratingArray.splice(index, 1);
            }
          });
          ratingArray.push({ rating: initialRating, movie });
          localforage.setItem('rating', ratingArray);
        }
      });

      SnackbarStore.commit('showSnackbar', {
        text: `${movie.title} has been rated!`,
        type: 'success',
      });
      TrackedMoviestStore.dispatch('sortTrackedMovies', TrackedMoviestStore.state.trackedMovieList);
    };

    onMounted(() => {
      localforage.getItem<RatingObject[]>('rating').then((ratingArray) => {
        if (ratingArray) {
          ratingArray.forEach((rating: RatingObject) => {
            if (rating.movie.id === movie.id) {
              storedRating.value = rating.rating;
              displayRating(storedRating.value);
            }
          });
        }
      });
    });

    return {
      storedRating,
      displayRating,
      addRating,
      halfStar,
      fullStar,
    };
  },
});
</script>

<style scoped lang="scss">
  .ratingContainer {
    display: flex;
    div {
      position: relative;
      div {
        position: absolute;
        cursor: pointer;
        top: 8px;
        height: 28px;
        width: 16.5px;
        &.half-star {
          left: 0;
        }
        &.full-star {
          left: 16.5px;
        }
      }
      span {
        color: #efff00;
        padding: 10px 4.5px;
      }
    }
  }
</style>

<template>
  <div class='ratingContainer'
    v-on:mouseleave='displayRating(storedRating)'>
    <div v-for='n in 5' :key='n'>
      <div
        :class="[`half-star half-star${n}`]"
        v-on:mouseenter='displayRating(n - 0.5)'
        v-on:click='addRating(n - 0.5)' />
      <div
        :class="[`full-star full-star${n}`]"
        v-on:mouseenter='displayRating(n)'
        v-on:click='addRating(n)' />
      <StarHalfFullIcon
        v-if='halfStar[n]' />
      <StarIcon
        v-if='fullStar.list[n].value' />
      <StarOutlineIcon
        v-if='!fullStar.list[n].value && halfStar[n] === false' />
    </div>
  </div>
</template>
