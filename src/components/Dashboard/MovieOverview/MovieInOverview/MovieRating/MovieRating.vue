<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue';
import StarIcon from 'vue-material-design-icons/Star.vue';
import StarHalfFullIcon from 'vue-material-design-icons/StarHalfFull.vue';
import localforage from 'localforage';
import SnackbarStore from '@/stores/SnackbarStore';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

type Rating = {
  value: number;
  id: number;
}

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
    localforage.getItem<[]>('rating').then((ratings) => {
      if (ratings) {
        ratings.forEach((rating: Rating) => {
          if (rating.id === this.movie.id) {
            this.storedRating = rating.value;
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
    localforage.getItem<Rating[]>('rating').then((value) => {
      if (value) {
        value.forEach((ratings: Rating, index) => {
          if (ratings.id === this.movie.id) value.splice(index, 1);
        });
        value.push({ value: rating, id: this.movie.id });
        localforage.setItem('rating', value);
      }
    });
    this.storedRating = rating;
    SnackbarStore.commit('showSnackbar', {
      text: `${this.movie.title} has been rated!`,
      type: 'success',
    });
  }
}
</script>

<style scoped lang="scss">
  .ratingContainer {
    position: relative;
    display: flex;
    div {
      span {
        color: #efff00;
        cursor: pointer;
        float: left;
        padding: 10px 4.5px;
      }
    }
    .x {
      position: absolute;
      cursor: pointer;
      top: 8px;
      height: 28px;
      width: 16.5px;
      &.x1 {
        left: 0px;
      }
      &.x2 {
        left: 33px;
      }
      &.x3 {
        left: 66px;
      }
      &.x4 {
        left: 99px;
      }
      &.x5 {
        left: 132px;
      }
    }
    .y {
      position: absolute;
      cursor: pointer;
      top: 8px;
      height: 28px;
      width: 16.5px;
      &.y1 {
        left: 17px;
      }
      &.y2 {
        left: 50px;
      }
      &.y3 {
        left: 82px;
      }
      &.y4 {
        left: 115px;
      }
      &.y5 {
        left: 148px;
      }
    }
  }
</style>

<template>
  <div class='ratingContainer'
    v-on:mouseleave='displayRating(storedRating)'>
    <div>
      <div
        class='x x1'
        v-on:mouseenter='displayRating(0.5)'
        v-on:click='addRating(0.5)' />
      <div class='y y1'
        v-on:mouseenter='displayRating(1)'
        v-on:click='addRating(1)' />
      <StarHalfFullIcon
        v-if='halfStar[1]' />
      <StarIcon
        v-if='fullStar[1]' />
      <StarOutlineIcon
        v-if='!fullStar[1] && halfStar[1] === false' />
    </div>
    <div>
      <div
        class='x x2'
        v-on:mouseenter='displayRating(1.5)'
        v-on:click='addRating(1.5)' />
      <div class='y y2' v-on:mouseenter='displayRating(2)' v-on:click='addRating(2)' />
      <StarHalfFullIcon v-if='halfStar[2]' />
      <StarIcon
        v-if='fullStar[2]' />
      <StarOutlineIcon
        v-if='!fullStar[2] && halfStar[2] === false' />
    </div>
    <div>
      <div
        class='x x3'
        v-on:mouseenter='displayRating(2.5)'
        v-on:click='addRating(2.5)' />
      <div class='y y3' v-on:mouseenter='displayRating(3)' v-on:click='addRating(3)' />
      <StarHalfFullIcon v-if='halfStar[3]' />
      <StarIcon
        v-if='fullStar[3]' />
      <StarOutlineIcon
        v-if='!fullStar[3] && halfStar[3] === false' />
    </div>
    <div>
      <div
        class='x x4'
        v-on:mouseenter='displayRating(3.5)'
        v-on:click='addRating(3.5)' />
      <div class='y y4' v-on:mouseenter='displayRating(4)' v-on:click='addRating(4)' />
      <StarHalfFullIcon v-if='halfStar[4]' />
      <StarIcon
        v-if='fullStar[4]' />
      <StarOutlineIcon
        v-if='!fullStar[4] && halfStar[4] === false' />
    </div>
    <div>
      <div
        class='x x5'
        v-on:mouseenter='displayRating(4.5)'
        v-on:click='addRating(4.5)' />
      <div class='y y5' v-on:mouseenter='displayRating(5)' v-on:click='addRating(5)' />
      <StarHalfFullIcon v-if='halfStar[5]' />
      <StarIcon
        v-if='fullStar[5]' />
      <StarOutlineIcon
        v-if='!fullStar[5] && halfStar[5] === false' />
    </div>
  </div>
</template>
