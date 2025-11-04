import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Players from '@/components/Players.vue';
import Matches from '@/components/Matches.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/players',
    component: Players,
  },
  {
    path: '/matches',
    component: Matches,
  },
];

const router = createRouter({
  history: createWebHistory(), // Используем режим истории HTML5
  routes, // Список маршрутов
});

export default router;
