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
  rating: number;
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
    localforage.getItem<[]>('rating').then((value) => {
      if (value) {
        value.forEach((rating: Rating) => {
          if (rating.id === this.movie.id) {
            this.storedRating = rating.rating;
            this.initialRating(rating.rating);
          }
        });
      }
    });
  }

  hoverArray = [false, false, false, false, false, false]

  halfStar = [false, false, false, false, false, false]

  somevalue = false;

  initialRating(rating: number) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index <= rating; index += 0.5) {
      this.somevalue = !this.somevalue;
      this.hoverArray[index] = true;
    }
    if (!Number.isInteger(rating)) this.halfStar[Math.round(rating)] = true;
  }

  rateMovie(rating: number) {
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= rating; index++) {
      if (rating <= this.storedRating) {
        // eslint-disable-next-line no-plusplus
        for (let secondIndex = rating; secondIndex <= this.storedRating; secondIndex++) {
          this.hoverArray[secondIndex] = false;
          //
        }

        this.somevalue = !this.somevalue;
        this.hoverArray[index] = true;
        this.halfStar[index] = false;
        this.halfStar[index + 1] = false;
      } else {
        this.somevalue = !this.somevalue;
        this.hoverArray[index] = true;
        this.halfStar[index] = false;
        this.halfStar[index + 1] = false;
        //
      }
    }
  }

  rateMoviex(rating: number) {
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= rating; index++) {
      this.somevalue = !this.somevalue;
      this.hoverArray[index] = false;
    }
  }

  addRating(rating: number) {
    localforage.getItem<Rating[]>('rating').then((value) => {
      if (value) {
        value.forEach((ratings: Rating, index) => {
          if (ratings.id === this.movie.id) {
            value.splice(index, 1);
          }
        });
        value.push({ rating, id: this.movie.id });
        localforage.setItem('rating', value);
      }
    });
    this.storedRating = rating;
    SnackbarStore.commit('showSnackbar', {
      text: `${this.movie.title} has been rated!`,
      type: 'success',
    });
  }

  resetRating() {
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= this.storedRating; index += 0.5) {
      this.somevalue = !this.somevalue;
      this.hoverArray[index] = true;
      this.halfStar[index] = false;
    }

    // eslint-disable-next-line no-plusplus
    for (let index = Math.floor(this.storedRating); index <= 5; index += 0.5) {
      this.somevalue = !this.somevalue;
      if (this.storedRating !== 5) this.hoverArray[index + 1] = false;
      this.halfStar[index] = false;
    }

    this.somevalue = !this.somevalue;
    if (!Number.isInteger(this.storedRating)) {
      this.somevalue = !this.somevalue;
      this.halfStar[Math.round(this.storedRating)] = true;
    }
  }

  hoverHalfStar(rating: number) {
    this.somevalue = !this.somevalue;

    this.halfStar[rating] = true;
    this.hoverArray[rating] = false;
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= rating; index++) {
      this.somevalue = !this.somevalue;
      this.hoverArray[index - 1] = true;
      this.halfStar[index - 1] = false;
    }
    // eslint-disable-next-line no-plusplus
    for (let index = rating; index <= 5; index++) {
      this.hoverArray[index] = false;
      if (index > rating) this.halfStar[index] = false;
    }
  }

  hoverHalfStarX(rating: number) {
    this.somevalue = !this.somevalue;
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= 5; index++) {
      if (index > rating) {
        this.halfStar[index] = false;
      }
    }
  }

  rateHalfStar(rating: number) {
    this.addRating(rating);
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
    v-on:mouseleave='resetRating()'>
    <div style='display: none'>{{somevalue}}, {{hoverArray[0]}}</div>
    <div>
      <div
        class='x x1'
        v-on:mouseleave='hoverHalfStarX(1)'
        v-on:mouseenter='hoverHalfStar(1)'
        v-on:click='rateHalfStar(0.5)' />
      <div class='y y1' v-on:mouseenter='rateMovie(1)' v-on:click='addRating(1)' />
      <StarHalfFullIcon v-if='halfStar[1]' />
      <StarIcon
        v-if='hoverArray[1]' />
      <StarOutlineIcon
        v-if='!hoverArray[1] && halfStar[1] === false' />
    </div>
    <div>
      <div
        class='x x2'
        v-on:mouseleave='hoverHalfStarX(2)'
        v-on:mouseenter='hoverHalfStar(2)'
        v-on:click='rateHalfStar(1.5)' />
      <div class='y y2' v-on:mouseenter='rateMovie(2)' v-on:click='addRating(2)' />
      <StarHalfFullIcon v-if='halfStar[2]' />
      <StarIcon
        v-if='hoverArray[2]' />
      <StarOutlineIcon
        v-if='!hoverArray[2] && halfStar[2] === false' />
    </div>
    <div>
      <div
        class='x x3'
        v-on:mouseleave='hoverHalfStarX(3)'
        v-on:mouseenter='hoverHalfStar(3)'
        v-on:click='rateHalfStar(2.5)' />
      <div class='y y3' v-on:mouseenter='rateMovie(3)' v-on:click='addRating(3)' />
      <StarHalfFullIcon v-if='halfStar[3]' />
      <StarIcon
        v-if='hoverArray[3]' />
      <StarOutlineIcon
        v-if='!hoverArray[3] && halfStar[3] === false' />
    </div>
    <div>
      <div
        class='x x4'
        v-on:mouseleave='hoverHalfStarX(4)'
        v-on:mouseenter='hoverHalfStar(4)'
        v-on:click='rateHalfStar(3.5)' />
      <div class='y y4' v-on:mouseenter='rateMovie(4)' v-on:click='addRating(4)' />
      <StarHalfFullIcon v-if='halfStar[4]' />
      <StarIcon
        v-if='hoverArray[4]' />
      <StarOutlineIcon
        v-if='!hoverArray[4] && halfStar[4] === false' />
    </div>
    <div>
      <div
        class='x x5'
        v-on:mouseleave='hoverHalfStarX(5)'
        v-on:mouseenter='hoverHalfStar(5)'
        v-on:click='rateHalfStar(4.5)' />
      <div class='y y5' v-on:mouseenter='rateMovie(55)' v-on:click='addRating(5)' />
      <StarHalfFullIcon v-if='halfStar[5]' />
      <StarIcon
        v-if='hoverArray[5]' />
      <StarOutlineIcon
        v-if='!hoverArray[5] && halfStar[5] === false' />
    </div>
  </div>
</template>
