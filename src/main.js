// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
import Axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '../src/css/animate.min.css'

Vue.config.productionTip = false

Vue.use(iView)
Vue.prototype.Axios=Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
