<template>
  <div>
    <h2>Welcome to the Mall</h2>
    <div>
      We shall display for you here, some personalized or general items in our stores; depends if you are logged in.
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { RootState } from '../../store/types';

export default {
  name: 'HomeMall',
  setup() {
    const store = useStore<RootState>();
    const loggedIn = computed(() => store.state.auth.data.loggedIn);
    return { loggedIn };
  },
  data() {
    const name = ref(this.$route.name);
    const title = computed(() => name.value);
    return { title };
  },
};
</script>
