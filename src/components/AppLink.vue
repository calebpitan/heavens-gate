<template>
  <router-link class="text-pink-800 dark:text-pink-500 hover:text-current transition-color duration-500">
    {{ text }}<slot />
  </router-link>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    text: { type: String, default: null },
  },
};
</script>

<style lang="postcss" scoped></style>
