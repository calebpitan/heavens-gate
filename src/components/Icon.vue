<template>
  <span class="icon" v-html="IconSvg" />
</template>

<script lang="ts">
import feather from 'feather-icons';

type GetIconOptions = { name: string; iconClass: string; strokeWidth: string; color: string };
const getIcon = ({ name, iconClass, strokeWidth, color }: GetIconOptions) => {
  const icon = feather.icons[name];
  icon.attrs.width = '1em';
  icon.attrs.height = '1em';
  const IconSvg = icon.toSvg({
    class: iconClass,
    'stroke-width': strokeWidth,
    color: color,
    'aria-hidden': 'true',
  });
  return IconSvg;
};

export default {
  props: {
    name: String,
    iconClass: String,
    strokeWidth: { type: String, default: '2' },
    color: { type: String, default: 'currentColor' },
  },
  data() {
    const IconSvg = getIcon({
      name: this.$props.name!,
      iconClass: this.$props.iconClass!,
      strokeWidth: this.$props.strokeWidth!,
      color: this.$props.color!,
    });
    return { IconSvg };
  },
  updated() {
    const IconSvg = getIcon({
      name: this.$props.name!,
      iconClass: this.$props.iconClass!,
      strokeWidth: this.$props.strokeWidth!,
      color: this.$props.color!,
    });
    this.$data.IconSvg = IconSvg;
  },
};
</script>

<style lang="postcss" scoped></style>
