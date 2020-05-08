import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)
Vue.config.productionTip = false

Vue.config.silent = true;
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
