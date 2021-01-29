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
    :class="`flex items-center justify-center w-4 h-4 border-2 ${
      disabled ? 'border-gray-200' : 'border-gray-500'
    } rounded-sm transition-colors
  transition-shadow duration-500`"
    @click="toggle"
  >
    <Icon v-if="checkbox.checked" name="check" stroke-width="3" class="pointer-events-none" />
  </span>
</template>

<script lang="ts">
import { ref } from 'vue';
import Icon from '../Icon.vue';

export default {
  name: 'Checkbox',
  components: { Icon },
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
      this.input.focus();
      this.input.click();
    },
  },
};
</script>

<style lang="postcss">
.checkbox {
  /* visibility: hidden; */
}

.checkbox:focus:not(:checked) + span {
  box-shadow: 0 0 0 0.05rem black;
}

.checkbox:checked + span {
  @apply w-3.5 h-3.5 p-2;
  border: 0;
  background: black;
}
</style>
