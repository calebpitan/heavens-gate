<template>
  <div :class="`${className} px-5 md:px-10 lg:px-16 py-10`">
    <form v-bind="attrs" :method="method" :name="name">
      <span class="block text-2xl text-black text-center font-bold mb-7 -mt-2">{{ title }}</span>
      <slot></slot>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormOverlay',
  inheritAttrs: false,
  data() {
    const { class: className, ...attrs } = this.$attrs;
    return { className, attrs };
  },
  props: {
    method: String,
    title: String,
    name: String,
  },
};
</script>

<style lang="postcss" scoped></style>
