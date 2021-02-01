import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Home from '../views/home/Index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { guarded: false },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home-mall" */ '../views/home/Home.vue'),
        meta: { guarded: false },
      },
      {
        path: '/new',
        name: 'New',
        component: () => import(/* webpackChunkName: "new" */ '../views/home/NewItem.vue'),
        meta: { guarded: true },
      },
    ],
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
