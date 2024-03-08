import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import InfoView from '@/views/InfoView.vue'
import OverlayView from '@/views/OverlayView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/overlay',
    component: OverlayView
  },
  {
    path: '/info',
    component: InfoView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
