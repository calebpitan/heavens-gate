import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
// import Signup from '../views/Signup.vue';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
  },
];

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
