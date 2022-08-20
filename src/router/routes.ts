import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'music', component: () => import('pages/MusicPage.vue') },
      {
        path: 'sounds',
        component: () => import('pages/SoundsPage.vue'),
      },
    ],
  },
  {
    path: '/test',
    component: () => import('pages/testPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
