<template>
  <div :class="`flex rounded-md ${focused ? (errored ? `ring-2 ${errorClass}` : 'ring-2 ring-black') : ''}`">
    <input
      ref="baseInput"
      v-model="value"
      v-bind="$attrs"
      :class="`flex-grow w-full ${inputClass} py-2 md:py-3 border-gray-300 focus:outline-none`"
      @focus="focused = true"
      @blur="focused = false"
    />
    <slot>
      <span v-if="icon" :class="`bg-white ${inputAppendClass} py-2 md:py-3 text-2xl`" @click="onAppendClick">
        <Icon :name="icon" stroke-width="2" />
      </span>
    </slot>
  </div>
</template>

<script lang="ts">
import Icon from '../Icon.vue';

export default {
  name: 'BaseAppendInput',
  inheritAttrs: false,
  components: { Icon },
  props: {
    icon: { type: String, default: null },
    before: { type: Boolean, default: false },
    errored: { type: Boolean, default: false },
    errorClass: { type: String, default: '' },
    onAppendClick: { type: Function, default: () => null },
  },
  data() {
    let inputClass: string;
    let inputAppendClass: string;
    if (this.$props.before) {
      inputClass = `order-last rounded-r-md pl-2 pr-4`;
      inputAppendClass = `rounded-l-md pl-4 pr-2`;
    } else {
      inputClass = `rounded-l-md pl-4 pr-2 `;
      inputAppendClass = `rounded-r-md pl-2 pr-4`;
    }
    return { inputClass, inputAppendClass, value: this.$attrs.value || '', focused: false };
  },
};
</script>
