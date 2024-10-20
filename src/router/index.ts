import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '@/utils/cookie';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        keepAlive: false
      },
      children: [
        {
          path: '/home',
          redirect: '/home/user'
        },
        {
          path: '/home/user',
          name: 'user',
          component: () => import('@/views/ManageUserView.vue'),
          meta: {
            keepAlive: false
          },
        }
      ]
    }
  ]
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  }else {
    if(getCookie('token')) {
      next();
    } else {
      next({path: '/login'})
    }
  }
});
export default router
