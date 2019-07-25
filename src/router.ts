import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Sample from './views/Sample.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sample',
      name: 'sample',
      component: Sample,
    },
  ],
});
