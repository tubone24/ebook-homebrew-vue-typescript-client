import Vue from 'vue';
import App from './App.vue';
import router from './router';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { init as SentryInit } from '@sentry/browser';
import { Dedupe, ExtraErrorData, Vue as SentryVue } from '@sentry/integrations';

// @ts-ignore
import VueParticles from 'vue-particles';
import Toasted from 'vue-toasted';

import store from './store/';

Vue.use(BootstrapVue);
Vue.use(VueParticles);
Vue.use(Toasted);

Vue.config.productionTip = false;

SentryInit({
    dsn: 'https://7b6959a517d44d199a9359ccc129cad7@sentry.io/1729562',
    integrations: [
        new Dedupe(),
        new ExtraErrorData({ depth: 3 }),
        new SentryVue ({ Vue,  attachProps: true }),
    ],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
