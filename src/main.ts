import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

const app = new Vue({
  render: (h) => h(App),
}).$mount('#app');
