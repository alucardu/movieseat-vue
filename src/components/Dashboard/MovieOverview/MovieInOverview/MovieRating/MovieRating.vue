<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Movie, RatingObject } from '@/types/';
import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue';
import StarIcon from 'vue-material-design-icons/Star.vue';
import StarHalfFullIcon from 'vue-material-design-icons/StarHalfFull.vue';
import localforage from 'localforage';
import SnackbarStore from '@/stores/SnackbarStore';
import TrackedMoviestStore from '@/stores/TrackedMoviesStore';

@Component({
  components: {
    StarOutlineIcon,
    StarIcon,
    StarHalfFullIcon,
  },
})
export default class MovieRating extends Vue {
  @Prop() private movie!: Movie;

  storedRating = 0;

  mounted() {
    localforage.getItem<RatingObject[]>('rating').then((ratingArray) => {
      if (ratingArray) {
        ratingArray.forEach((rating: RatingObject) => {
          if (rating.movie.id === this.movie.id) {
            this.storedRating = rating.rating;
            this.displayRating(this.storedRating);
          }
        });
      }
    });
  }

  fullStar = ['fillerValue', false, false, false, false, false];

  halfStar = ['fillerValue', false, false, false, false, false];

  displayRating(rating: number) {
    for (let index = 1; index <= 5; index++) {
      Vue.set(this.fullStar, index, false);
      Vue.set(this.halfStar, index, false);
      if (index <= rating) Vue.set(this.fullStar, index, true);
      if (!Number.isInteger(rating)) {
        if (index < Math.round(rating)) Vue.set(this.fullStar, index, true);
        if (index === Math.round(rating)) Vue.set(this.halfStar, index, true);
      }
    }
  }

  addRating(rating: number) {
    this.storedRating = rating;
    TrackedMoviestStore.dispatch('addRating', { movie: this.movie, rating });

    SnackbarStore.commit('showSnackbar', {
      text: `${this.movie.title} has been rated!`,
      type: 'success',
    });
    TrackedMoviestStore.dispatch('sortTrackedMovies', TrackedMoviestStore.state.trackedMovieList);
  }
}
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
        v-if='fullStar[n]' />
      <StarOutlineIcon
        v-if='!fullStar[n] && halfStar[n] === false' />
    </div>
  </div>
</template>
