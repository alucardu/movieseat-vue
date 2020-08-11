<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header/Header.vue';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent.vue';
import 'reset-css';

@Component({
  components: {
    Header,
    MovieSearchComponent,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
  body {
    background: #252525;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>

<template>
  <div id="app">
    <Header />
    <MovieSearchComponent />
  </div>
</template>
