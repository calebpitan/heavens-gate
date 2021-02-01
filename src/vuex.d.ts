import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { ApplicationStore } from './store';

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: ApplicationStore;
    $router: Router;
    $route: RouteLocationNormalizedLoaded;
    $refs: Record<string, any>;
  }
}
