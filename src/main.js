// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import routes from './router/index';
import Axios from 'axios';
import qs from 'qs';
import iView from 'iview';
import 'jquery';
import 'iview/dist/styles/iview.css';
import '../src/css/animate.min.css';
import '../src/css/commons.css';

Vue.use(iView);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.$qs = qs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    this.checkLogin();
  },
  methods:{
  	checkLogin() {
  		try{
  			if (window.localStorage.userName != "" && window.localStorage.userName != null && window.localStorage.userName != undefined) {
          // this.$router.push('/index');
          this.$router.push({ name: "home" });
        } else {
          this.$router.push({ name: "home" });
        }
  		}catch(e){
  			//TODO handle the exception
  			this.$router.push({ name: "navigation" });
  		}
  		
  	}
  }
})
