<template>
  <label :for="labelFor" class="sr-only font-semibold">{{ label }}<slot></slot></label>
</template>

<script>
export default {
  name: 'InputLabel',
  props: { label: String, labelFor: String },
};
</script>
