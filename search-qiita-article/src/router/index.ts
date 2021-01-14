import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SearchArticle from '../views/SearchArticle.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SearchArticle',
    component: SearchArticle
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
