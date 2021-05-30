import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import UserEdit from '../views/Edit.vue'
import axios from 'axios'

import Register from '../views/Register.vue'
Vue.use(VueRouter)

async function AdminAuth(to, from, next) {
  if(localStorage.getItem('token')) {
    let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    try{
      if(localStorage.getItem('token')) {
       await axios.post("http://localhost:8000/validate", {}, req)
       next();
     }
     next();
    } catch(err) {
      console.log(err.response)
      next("/login");
    }
  } else{
    next("/login");
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: UserEdit,
    beforeEnter: AdminAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
