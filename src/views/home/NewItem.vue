<template>
  <div class="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 gap-4">
    <div class="bg-white dark:bg-gray-700 space-y-4 p-4 rounded-lg">
      <div class="space-y-1">
        <InputLabel class="not-sr-only inline-block" labelFor="item-name" label="Item Name" />
        <Input
          v-model="item.name"
          type="text"
          placeholder="Item Name"
          class="bg-gray-100 dark:bg-gray-600 text-current focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-900"
          id="item-name"
        />
      </div>

      <div class="space-y-1">
        <InputLabel class="not-sr-only inline-block" labelFor="item-desc" label="Item Description" />
        <TextArea
          v-model="item.description"
          placeholder="Item Description"
          class="bg-gray-100 dark:bg-gray-600 text-current focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-900"
          id="item-desc"
        />
      </div>

      <div class="flex flex-fill space-x-4">
        <div class="space-y-1">
          <InputLabel class="not-sr-only inline-block" labelFor="item-quant" label="Item Quantity" />
          <Input
            v-model="item.quantity"
            type="number"
            placeholder="Item Quantity"
            class="bg-gray-100 dark:bg-gray-600 text-current focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-900"
            id="item-quant"
            :value="item.quantity"
            min="1"
          />
        </div>

        <div class="space-y-1">
          <InputLabel class="not-sr-only inline-block" labelFor="item-price" label="Item Price" />
          <Input
            v-model="item.price"
            type="number"
            placeholder="Item Price"
            class="bg-gray-100 dark:bg-gray-600 text-current focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-900"
            id="item-price"
            :value="item.price"
            min="10.00"
          />
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-700 space-y-4 p-4 rounded-lg">
      <InputLabel class="not-sr-only inline-block" labelFor="choose-store" label="Choose Store" />
      <Select
        id="choose-store"
        :options="['Great', 'Good', 'Frosty', 'Graham\'s']"
        title="Choose a store"
        :class="`bg-gray-100 dark:bg-gray-600 ${selectStateClass}`"
        navigation="circular"
        @fold="() => (selectStateClass = 'rounded-md')"
        @unfold="() => (selectStateClass = 'rounded-t-md')"
        @change="selection => (selected = selection)"
      />
      aaskdj
    </div>
  </div>
</template>

<script>
import InputLabel from '../../components/input/InputLabel.vue';
import Input from '../../components/input/Input.vue';
import TextArea from '../../components/input/TextArea.vue';
import Select from '../../components/input/Select.vue';

export default {
  components: { InputLabel, Input, TextArea, Select },
  name: 'New',
  data() {
    const selectStateClass = 'rounded-md';
    const selected = '';
    const item = {
      name: '',
      description: '',
      quantity: 1,
      price: 10.0,
    };
    return { item, selected, selectStateClass };
  },
};
</script>
