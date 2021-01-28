<template>
  <div :class="`${layerBgColor} h-full flex flex-col lg:grid lg:grid-cols-5`">
    <div
      v-bind="$attrs"
      class="self-center bg-current my-auto border-4 sm:border-8 lg:border-r-0 border-black rounded-xl sm:rounded-2xl lg:rounded-none lg:rounded-l-2xl lg:col-span-3 lg:m-20 py-7"
      :style="images[0]"
    >
      <!-- Main authentication/gate form controls -->
      <slot name="gate"></slot>
    </div>

    <div class="relative hidden lg:block lg:col-span-2 h-fulls pr-4 py-4 lg:clip-top-left">
      <div
        class="h-full w-full border-t-8 border-b-8 border-r-8 border-black rounded-r-2xl brightness-50"
        :style="images[1]"
      ></div>
      <!-- Presntational message -->
      <slot name="presentation"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GatePresentation',
  inheritAttrs: false,
  props: {
    images: { type: Array, default: [null, null] },
    layerBgColor: { type: String, default: 'bg-white' },
  },
};
</script>

<style lang="postcss" scoped>
.brightness-50 {
  filter: brightness(50%);
}
</style>
