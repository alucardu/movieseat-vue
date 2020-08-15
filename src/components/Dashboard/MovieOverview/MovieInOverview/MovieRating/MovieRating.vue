<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue';
import StarIcon from 'vue-material-design-icons/Star.vue';
import localforage from 'localforage';

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

  somevalue = false;

  initialRating(rating: number) {
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= rating; index++) {
      this.somevalue = !this.somevalue;
      this.hoverArray[index] = true;
    }
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
      } else {
        this.somevalue = !this.somevalue;
        this.hoverArray[index] = true;
        // this.hoverArray[index] = true;
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
  }

  resetRating() {
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= this.storedRating; index++) {
      this.somevalue = !this.somevalue;
      this.hoverArray[index] = true;
    }
  }
}
</script>

<style scoped lang="scss">
  .ratingContainer {
    display: flex;
    div {
      span {
        color: #efff00;
        cursor: pointer;
        float: left;
        padding: 10px 4.5px;
      }
    }
  }
</style>

<template>
  <div class='ratingContainer'
    v-on:mouseleave='resetRating()'>
    <div style='display: none'>{{somevalue}}, {{hoverArray[0]}}</div>
    <div>
      <StarIcon
        v-if='hoverArray[1]'
        v-on:mouseleave='rateMoviex(1)'
        v-on:mouseenter='rateMovie(1)'
        v-on:click='addRating(1)' />
      <StarOutlineIcon v-if='!hoverArray[1]' v-on:mouseenter='rateMovie(1)' />
    </div>
    <div>
      <StarIcon
        v-if='hoverArray[2]'
        v-on:mouseleave='rateMoviex(2)'
        v-on:mouseenter='rateMovie(2)'
        v-on:click='addRating(2)' />
      <StarOutlineIcon v-if='!hoverArray[2]' v-on:mouseenter='rateMovie(2)' />
    </div>
    <div>
      <StarIcon
        v-if='hoverArray[3]'
        v-on:mouseleave='rateMoviex(3)'
        v-on:mouseenter='rateMovie(3)'
        v-on:click='addRating(3)' />
      <StarOutlineIcon v-if='!hoverArray[3]' v-on:mouseenter='rateMovie(3)' />
    </div>
    <div>
      <StarIcon
        v-if='hoverArray[4]'
        v-on:mouseleave='rateMoviex(4)'
        v-on:mouseenter='rateMovie(4)'
        v-on:click='addRating(4)' />
      <StarOutlineIcon v-if='!hoverArray[4]' v-on:mouseenter='rateMovie(4)' />
    </div>
    <div>
      <StarIcon
        v-if='hoverArray[5]'
        v-on:mouseleave='rateMoviex(5)'
        v-on:mouseenter='rateMovie(5)'
        v-on:click='addRating(5)' />
      <StarOutlineIcon v-if='!hoverArray[5]' v-on:mouseenter='rateMovie(5)' />
    </div>
  </div>
</template>
