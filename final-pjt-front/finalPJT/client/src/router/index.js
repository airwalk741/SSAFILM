import Vue from 'vue'
import VueRouter from 'vue-router'
import Movie from '../views/Movie.vue'
import Gate from '@/views/Gate'
import Detail from '@/views/Detail'
import Recommend from '@/views/Recommend'
import Recommended from '@/views/Recommended'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Gate',
    component: Gate,
    
  },
  {
    path: '/Movie',
    name: 'Movie',
    component: Movie,
  },
  {
    path: '/community',
    name: 'Community',
    // component: () => import(/* webpackChunkName: "community" */ '../views/Community.vue')
  },
  {
    path: '/Detail/:movieId',
    name: 'Detail',
    props: true,
    component: Detail,
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
  },
  {
    path: '/recommended',
    name: 'Recommended',
    component: Recommended,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
