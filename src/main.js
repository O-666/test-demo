import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import {
  Quasar,
  QIcon,
  QAvatar,
  QForm,
  QPage
} from 'quasar'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(Quasar, {
  components: {
    QAvatar,
    QIcon,
    QForm,
    QPage,
  }
})
