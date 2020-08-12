<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SnackbarStore from '@/stores/SnackbarStore';

@Component
export default class Snackbar extends Vue {
  snackbar = {
    visible: false,
    text: '',
    color: '',
  }

  mounted() {
    SnackbarStore.subscribe((mutation, state) => {
      this.snackbar.visible = state.snackbar.visible;
      this.snackbar.text = state.snackbar.text;
      this.snackbar.color = state.snackbar.color;
    });
  }
}
</script>

<style scoped lang="scss">
  .success {
    color: green;
    .v-snack__wrapper {
      background: green;
    }
  }
</style>

<template>
  <div>
    <v-snackbar
      :color='snackbar.color'
      v-bind:class='snackbar.type'
      v-model='snackbar.visible'>
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>
