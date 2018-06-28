import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register/register'
import login from '@/components/login/login'
import home from '@/components/home/home'
import navigation from '@/components/home/navigation/navigation'
import serverVue from '@/components/server/server'
// Header 组件
const index = r => require.ensure([], () => r(require('@/components/Index')), 'index')
// Header 组件
const headers = r => require.ensure([], () => r(require('@/components/header')), 'page')
// footer 组件
const footers = r => require.ensure([], () => r(require('@/components/footer')), 'page')

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/index',
		},
		{
			path: '/index',
			name: 'index',
			component: index,
			children: [{
					path: '/headers',
					name: 'headers',
					component: headers
				},
				{
					path: '/footers',
					name: 'footers',
					component: footers
				}
			]
		},
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
			children: [{
				path: '/navigation',
				name: 'navigation',
				component: navigation
			}]
		}
	]
})