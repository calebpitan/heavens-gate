/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
}
