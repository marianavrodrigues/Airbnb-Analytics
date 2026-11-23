import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatisticsView from '../views/StatisticsView.vue'
import MapView from '../views/MapView.vue'
import CompareView from '../views/CompareView.vue'
import AboutView from '../views/AboutView.vue'
import HelpView from '../views/HelpView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/estatisticas',
      name: 'statistics',
      component: StatisticsView
    },
    {
      path: '/mapa',
      name: 'map',
      component: MapView
    },
    {
      path: '/comparar',
      name: 'compare',
      component: CompareView
    },
    {
      path: '/sobre',
      name: 'about',
      component: AboutView
    },
    {
      path: '/ajuda',
      name: 'help',
      component: HelpView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router