<template>
  <input
    ref="baseInput"
    v-model="value"
    class="w-full rounded-md px-4 py-2 md:py-3 border-1 focus:outline-none focus:border-transparent focus:ring-2 transition-shadow duration-500"
  />
</template>

<script lang="ts">
export default {
  name: 'BaseInput',
  data() {
    return { value: this.$attrs.value || '' };
  },
};
</script>
