import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      visible: false,
      text: '',
      timeout: 6000,
      multiline: false,
      color: '',
    },
  },
  mutations: {
    showSnackbar(state, payload) {
      state.snackbar.text = payload.text;

      if (payload.text.length > 50) {
        state.snackbar.multiline = true;
      } else {
        state.snackbar.multiline = false;
      }

      if (payload.multiline) {
        state.snackbar.multiline = payload.multiline;
      }

      if (payload.timeout) {
        state.snackbar.timeout = payload.timeout;
      }

      state.snackbar.color = payload.color;

      state.snackbar.visible = true;
    },
    closeSnackbar(state) {
      state.snackbar.visible = false;
      state.snackbar.multiline = false;
      state.snackbar.timeout = 6000;
      state.snackbar.text = '';
    },
  },
});
