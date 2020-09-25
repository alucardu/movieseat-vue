<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import HeaderMenu from './HeaderMenu/HeaderMenu.vue';

export default defineComponent({
  name: 'Header',
  components: {
    HeaderMenu,
  },
});
</script>

<style scoped lang="scss">
  header {
    display: flex;
    background: #0fcece;
    padding: 24px 8px;
    align-items: center;
    h1 {
      font-size: 3.5em;
      color: #fff;
      margin: 0;
      font-family: 'Oleo Script Swash Caps', cursive;
      text-shadow: 2px 2px 5px #000;
    }
    .headerMenu {
      user-select: none;
      position: relative;
      margin-left: auto;
    }
  }
  @media only screen and (max-width: 600px) {
    header {
      padding: 0;
      position: fixed;
      z-index: 2;
      width: 100%;
      top: 0;
      h1 {
        display: none;;
      }
    }
  }
</style>

<template>
  <header>
    <h1>Movieseat</h1>
    <HeaderMenu class='headerMenu'/>
  </header>
</template>
