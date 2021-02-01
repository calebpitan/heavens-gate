<template>
  <div class="h-full bg-gray-50, dark:bg-gray-800 text-gray-500 dark:text-gray-300">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppTheme',
  data() {
    const theme = 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-300'.split(' ');
    return { theme };
  },

  mounted() {
    document.documentElement.classList.add(...this.$data.theme);
  },

  unmounted() {
    document.documentElement.classList.remove(...this.$data.theme);
  },
};
</script>

<style lang="postcss" scoped></style>
