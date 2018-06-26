import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register/register'
import login from '@/components/login/login'
import home from '@/components/home/home'
import navigation from '@/components/home/navigation/navigation'
import serverVue from '@/components/server/server'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/register',
      name: 'register',
      component: register
    },
    {
    	path: '/login',
      name: 'login',
      component: login
    },
    {
    	path: '/serverVue',
      name: 'serverVue',
      component: serverVue
    },
    {
    	path: '/home',
      name: 'home',
      component: home,
      children:[
      	{
      		path:'/navigation',
      		name:'navigation',
      		component:navigation
      	}
      ]
    }
  ]
})
