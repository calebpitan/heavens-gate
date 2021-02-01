<template>
  <div class="inline-flex justify-center items-center text-xs font-semibold">
    <router-link :to="navTo" class="flex flex-col my-auto items-center text-center px-4 py-3">
      <Icon :name="icon" class="text-2xl" />
      {{ itemName }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Icon from '../Icon.vue';

export default {
  components: { Icon },
  name: 'BottomNavPill',
  props: {
    icon: { type: String, default: null },
    itemName: { type: String, default: 'Item' },
    navTo: { type: String, default: '#' },
  },
};
</script>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply text-pink-800 dark:text-pink-500;
}
</style>
