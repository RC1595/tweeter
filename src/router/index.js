import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import LoginView from '../views/LoginView.vue'
import Register from '../views/Register.vue'
import EditProfile from '../views/EditProfile.vue'
import Discover from '../views/Discover.vue'
import User from '../views/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/EditProfile',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '/Discover',
    name: 'Discover',
    component: Discover
  }
  ]

const router = new VueRouter({
  routes
})

export default router
