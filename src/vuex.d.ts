import { ComponentCustomProperties } from 'vue';
import { Router } from 'vue-router';
// import { Store } from 'vuex';
import { ApplicationStore } from './store';

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: ApplicationStore;
    $router: Router
  }
}
