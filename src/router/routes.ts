import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutPage.vue') }]
  },
  {
    path: '/write',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WritePage.vue') }]
  },
  {
    path: '/note/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ItemPage.vue') }]
  },
  {
    path: '/note/:id/update',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UpdatePage.vue') }]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
