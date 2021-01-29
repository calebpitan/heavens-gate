<template>
  <BaseAppendInput
    ref="input"
    v-model="value"
    v-bind="$attrs"
    :errorClass="modifiedErrorClass"
    :errored="errored"
    :type="visible ? 'text' : 'password'"
    :icon="visible ? 'eye' : 'eye-off'"
    @appendClick="visible = !visible"
    @keyup="visible = false"
  />
</template>

<script lang="ts">
import Icon from '../Icon.vue';
import BaseAppendInput from './BaseAppendInput.vue';

export default {
  name: 'PasswordInput',
  inheritAttrs: false,
  components: { Icon, BaseAppendInput },
  props: { errored: { type: Boolean, default: false }, errorClass: { type: String, default: '' } },
  data() {
    return { value: this.$attrs.value || '', visible: false, modifiedErrorClass: this.$props.errorClass };
  },
  updated() {
    this.$data.modifiedErrorClass = this.errorClass.replace(/^focus\:/, '');
  },
};
</script>
