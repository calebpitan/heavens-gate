<template>
  <BaseInput
    v-model="value"
    ref="_submit"
    type="submit"
    class="bg-black text-white font-semibold border-black shadow-2xl focus:ring-black hover:opacity-90 transition-all duration-150"
  />
</template>

<script lang="ts">
import BaseInput from './BaseInput.vue';

export default {
  name: 'Submit',
  components: { BaseInput },
  data() {
    return { value: this.$attrs.value || '' };
  },
};
</script>

<style lang="postcss" scoped></style>
