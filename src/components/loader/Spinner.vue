<template>
  <span class="absolute">
    <svg class="spinner-svg" :viewBox="viewBox" :width="size" :height="size" v-bind="$attrs">
      <ellipse
        class="spinner"
        :rx="r"
        :ry="r"
        :cx="x"
        :cy="y"
        :stroke-dasharray="strokeArray"
        :style="{ transformOrigin: 'center' }"
      />
    </svg>
  </span>
</template>

<script lang="ts">
import { gsap } from 'gsap';

const circumference = (r: number) => 2 * Math.PI * r;

export default {
  name: 'Spinner',
  inheritAttrs: false,
  props: { radius: { type: Number, default: 30 }, x: { type: Number, default: 12 }, y: { type: Number, default: 12 } },
  data() {
    const box = 24;
    const size = this.$props.radius * 2;
    const viewBox = `0 0 ${box} ${box}`;
    const ellipseRadius = (this.$props.radius * box) / size;
    const ellipseScaledDownRadius = ellipseRadius * 0.75;
    const strokeArray = circumference(ellipseScaledDownRadius);
    const thresholdOffset = strokeArray / 10;
    const strokeOffset = strokeArray - thresholdOffset;

    return { size, viewBox, r: ellipseScaledDownRadius, strokeArray, strokeOffset, thresholdOffset };
  },

  mounted() {
    // const tl = gsap.timeline();
    // tl.to('.spinner-svg', { rotateY: -180, transformOrigin: 'center', ease: 'none', duration: 0.0 });
    // tl.to('.spinner-svg', { rotateZ: -270, transformOrigin: 'center', ease: 'none', duration: 1 });
    // tl.to(
    //   '.spinner',
    //   {
    //     strokeDashoffset: () => this.$data.strokeOffset,
    //     // transform: 'rotateZ(-270deg)',
    //     transformOrigin: 'center',
    //     ease: 'none',
    //     duration: 1,
    //   },
    //   '-=0.9',
    // ).addLabel('start');
    // tl.to('.spinner-svg', { rotateY: 0, transformOrigin: 'center', ease: 'none', duration: 0.0 });
    // tl.to('.spinner-svg', { rotateZ: 0, transformOrigin: 'center', ease: 'none', duration: 1 });
    // tl.to(
    //   '.spinner',
    //   {
    //     strokeDashoffset: () => this.$data.thresholdOffset,
    //     // transform: 'rotateZ(0deg)',
    //     transformOrigin: 'center',
    //     ease: 'none',
    //     duration: 1,
    //   },
    //   '-=0.9',
    // );
    // tl.to('.spinner-svg', { rotateY: -180, transformOrigin: 'center', ease: 'none', duration: 0.0 });
    // tl.to('.spinner-svg', { rotateZ: -270, transformOrigin: 'center', ease: 'none', duration: 1 });
    // tl.to(
    //   '.spinner',
    //   {
    //     strokeDashoffset: () => this.$data.strokeOffset,
    //     // transform: 'rotateZ(-270deg)',
    //     transformOrigin: 'center',
    //     ease: 'none',
    //     duration: 1,
    //   },
    //   '-=0.9',
    // );
    // // tl.seek('start');
    // tl.repeat(-1);
    // tl.repeat(-1).delay(0).repeatDelay(0);
  },
};
</script>

<style lang="postcss" scoped>
svg {
  vertical-align: middle;
  overflow: hidden;
}

.spinner {
  fill: none;
  stroke: currentColor;
  transform-origin: center;
  stroke-dashoffset: 51;
  transform: rotate(360deg);
  animation: spin 4s ease-out infinite forwards;
  margin: -20px 0 0 -20px;
}

@keyframes spin {
  0% {
    transform: rotate(-270deg);
    stroke-dashoffset: 5;
  }

  70% {
    transform: rotate(0deg);
    stroke-dashoffset: 51;
  }

  100% {
    transform: rotate(90deg);
    stroke-dashoffset: 102;
  }
}
</style>
