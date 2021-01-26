<template>
  <input
    v-model="checkbox.checked"
    v-bind="$attrs"
    :checked="checkbox.checked"
    :disabled="disabled"
    ref="input"
    type="checkbox"
    class="checkbox sr-only"
  />
  <span
    :class="`w-4 h-4 border-2 ${disabled ? 'border-gray-200' : 'border-gray-400'} rounded-sm transition-colors
  transition-shadow duration-500`"
    @click="toggle"
  />
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'Checkbox',
  inheritAttrs: false,
  props: { checked: Boolean, disabled: Boolean },
  data() {
    return { checkbox: { checked: this.$props.checked || false } };
  },
  setup() {
    const input = ref<HTMLInputElement>(null!);
    return { input };
  },
  methods: {
    toggle() {
      this.input.click();
    },
  },
};
</script>

<style lang="postcss" scoped>
.checkbox {
  /* visibility: hidden; */
}
.checkbox:focus:not(:checked) + span {
  box-shadow: 0 0 0 0.05rem black;
}
.checkbox:checked + span {
  @apply w-3.5 h-3.5;
  border: 0;
  background: black;
  box-shadow: 0 0 0 0.09rem white, 0 0 0 0.18rem black;
}
</style>
