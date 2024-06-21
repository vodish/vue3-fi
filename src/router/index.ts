import { createRouter, createWebHistory } from 'vue-router'
import PageProduct from '@/pages/PageProduct.vue'
import PageProductCard from '@/pages/PageProductCard.vue'
import PageItem from '@/pages/PageItem.vue'
import PageItemCard from '@/pages/PageItemCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/product' },
    { path: '/product', name: "product", component: PageProduct },
    { path: '/product/:id', name: "product.id", component: PageProductCard },
    { path: '/item', name: "item", component: PageItem },
    { path: '/item/:id', name: "item.id", component: PageItemCard },
  ]
})

export default router
