<template>
  <input
    v-model="value"
    class="w-full rounded-md px-4 py-2 md:py-3 border-2 border-gray-300 focus:border-0 focus:ring-1 focus:ring-black transition-all duration-500"
  />
</template>

<script>
export default {
  name: 'Input',
  data() {
    return { value: this.$attrs.value || '' };
  },
};
</script>
