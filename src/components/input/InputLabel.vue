<template>
  <label :for="labelFor" class="sr-only">{{ label }}<slot></slot></label>
</template>

<script>
export default {
  name: 'InputLabel',
  props: { label: String, labelFor: String },
};
</script>
