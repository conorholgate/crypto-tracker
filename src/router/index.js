import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Currencies from '../views/Currencies.vue'
import { useCryptoStore } from '@/stores/cryptoStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/currencies/:name',
      name: 'currencies',
      component: Currencies,
      props: true,
      beforeEnter: (to, from, next) => {
        const store = useCryptoStore()
        if (!from.name) {
          store.getCoinMetadata(to.params.name)
        }
        next()
      },
    },
    { path: '/:pathMatch(.*)', component: HomeView },
  ],
})

export default router
