// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
// import BootstrapVue from 'bootstrap-vue';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSwal from 'vue-swal';
import { store } from './store/store';

// Vue.use(BootstrapVue);
Vue.use(VueSwal);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
