<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header/Header.vue';
import MovieSearchComponent from './components/MovieSearch/MovieSearchComponent.vue';
import Dashboard from './components/Dashboard/Dashboard.vue';
import Snackbar from './components/Snackbar/Snackbar.vue';
import 'reset-css';

@Component({
  components: {
    Header,
    MovieSearchComponent,
    Dashboard,
    Snackbar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
  body, html {
    height: 100%;
  }
  body {
    background: linear-gradient(#0fcece 104px,#252525 0%);
    display: flex;
    justify-content: center;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    #app {
      max-width: 1920px;
      width: 100%;
    }
  }
  @media only screen and (max-width: 600px) {
    body {
      padding-top: 40px;
      background: #252525;
    }
  }
</style>

<template>
  <div id="app" data-app>
    <Header />
    <MovieSearchComponent />
    <Dashboard />
    <Snackbar />
  </div>
</template>
