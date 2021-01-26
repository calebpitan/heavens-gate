<template>
  <div class="bg-black h-screen">
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { AuthActionType, CheckLoggedInActionPayload } from './store/auth/types';
import { RootState } from './store/types';

export default defineComponent({
  name: 'App',
  // watch: { $route: 'guard' },
  data() {
    return { hasCheckedAuthStatus: false };
  },
  setup() {
    const store = useStore<RootState>();
    return { loggedIn: computed(() => store.state.auth.data.loggedIn) };
  },
  methods: {
    guard() {
      const route = this.$route;

      if (route.matched.length === 0 || !this.$data.hasCheckedAuthStatus) return;

      const loggedIn = this.loggedIn;
      const guarded = route.meta.guarded as boolean;
      const unguards = ['Login', 'Signup'];

      if (guarded && !loggedIn) {
        this.$router.push('/login');
      } else if (unguards.includes(route.name as string) && loggedIn) {
        this.$router.push('/');
      }
    },
  },
  mounted() {
    watch(
      () => this.$route,
      () => this.guard(),
    );
    this.$store
      .dispatch<CheckLoggedInActionPayload>({ type: AuthActionType.CHECK_LOGGED_IN })
      .then(() => (this.$data.hasCheckedAuthStatus = true))
      .then(() => this.guard());
  },
});
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
