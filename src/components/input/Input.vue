<template>
  <BaseInput ref="input" v-model="value" class="border-gray-300 focus:ring-black" />
</template>

<script lang="ts">
import BaseInput from './BaseInput.vue';

export default {
  name: 'Input',
  components: { BaseInput },
  data() {
    return { value: this.$attrs.value || '' };
  },
};
</script>
