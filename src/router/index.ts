import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import AboutView from '@/views/AboutView.vue'
import RoomView from '@/views/RoomView.vue'
import ShippingView from '@/views/ShippingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetailView
    },
    { path: '/about', 
      name: 'about', 
      component: AboutView 
    },
    { path: '/room', 
      name: 'room', 
      component: RoomView 
    },
    { path: '/shipping', 
      name: 'shipping', 
      component: ShippingView 
    },
  ],
})

export default router