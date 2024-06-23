import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/Users/View.vue'
import UserCreate from '../views/Users/Create.vue'
import ProductView from '../views/Products/View.vue'
import ProductCreate from '../views/Products/Create.vue'
import ReviewCreate from '../views/Products/Reviews/Create.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/users/create',
      name: 'userCreate',
      component: UserCreate
    },
    {
      path: '/users',
      name: 'users',
      component: UserView
    },
    {
      path: '/products/create',
      name: 'productCreate',
      component: ProductCreate
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/products/reviews/create',
      name: 'reviewCreate',
      component: ReviewCreate
    }
  ]
})

export default router
