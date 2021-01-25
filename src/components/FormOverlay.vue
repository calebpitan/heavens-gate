<template>
  <div class="px-5 md:px-10 lg:px-16 py-10">
    <form :method="method" :name="name" @submit.prevent="onSubmit">
      <span class="block text-xl text-black text-center font-bold mb-7 -mt-2">{{ title }}</span>
      <slot></slot>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormOverlay',
  props: {
    method: String,
    title: String,
    name: String,
    onSubmit: Function,
  },
};
</script>

<style lang="postcss" scoped></style>
