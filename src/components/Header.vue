<template>
  <div class="header" ref="header">
    <header class="flex items-center">
      <div class="flex-grow">
        <button
          :class="`flex items-center ${
            canNavigate ? '-ml-2' : ''
          } text-black dark:text-white text-3xl font-bold focus:outline-none`"
          @click="navigate"
        >
          <Icon v-if="canNavigate" name="chevron-left" strokeWidth="3" />
          <h1 class="tracking-tight">{{ title }}</h1>
        </button>
      </div>
      <div v-if="loggedIn">
        <app-link to="/orders" class="flex flex-col items-center text-2xl font-semibold">
          <Icon name="truck" />
          <span class="text-xs"> Orders </span>
        </app-link>
      </div>
      <div v-else class="flex items-center space-x-4">
        <app-link to="/login"> Log in </app-link>
        <app-link to="/signup"> Sign up </app-link>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import AppLink from './AppLink.vue';
import Icon from './Icon.vue';

export default {
  components: { Icon, AppLink },
  name: 'Header',
  props: {
    title: { type: String, default: 'Home' },
    loggedIn: { type: Boolean, default: false },
    canNavigate: { type: Boolean, default: false },
  },
  methods: {
    navigate() {
      if (this.$props.canNavigate) {
        return this.$router.history.go(-1);
      }
      this.$router.push('/');
    },
  },
};
</script>
