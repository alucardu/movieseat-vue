<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HeaderMenu from './HeaderMenu/HeaderMenu.vue';

@Component({
  components: {
    HeaderMenu,
  },
})
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
  header {
    display: flex;
    background: #0fcece;
    padding: 24px;
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
</style>

<template>
  <header>
    <h1>Movieseat</h1>
    <HeaderMenu class='headerMenu'/>
  </header>
</template>
