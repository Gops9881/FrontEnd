import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Menu from '../views/Menu'
import Signin from '../views/Signin'
import Join from '../views/Join'
import listUser from '../views/ListUsers'
// import store from '@/store.js'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: Signin
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    },
    {
      path: '/listusers',
      name: 'listusers',
      component: listUser
    }
  ]
})
export default router
