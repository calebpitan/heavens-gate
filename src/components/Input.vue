<template>
  <input
    ref="input"
    v-model="value"
    class="w-full rounded-md px-4 py-2 md:py-3 border-2 border-gray-300 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-black transition-shadow duration-500"
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
