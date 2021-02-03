<template>
  <div :id="comboboxWrapperId" dir="auto" class="relative">
    <div
      :id="comboboxId"
      :aria-owns="listboxId"
      :aria-label="title"
      :aria-expanded="expanded"
      aria-haspopup="listbox"
      role="combobox"
    >
      <div class="flex items-center">
        <input
          :id="id"
          class="searchable-input focus:outline-none"
          type="search"
          ref="select"
          autocomplete="off"
          aria-autocomplete="list"
          aria-labelledby="select_combobox"
          :aria-controls="listboxId"
          :aria-activedescendant="expanded && activeDescendant ? activeDescendant.getAttribute('id') : null"
          :placeholder="title"
          v-model="selected"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <Icon
          :class="`cursor-pointer text-xl ${!expanded && selected.length > 0 ? 'visible' : 'invisible'}`"
          name="x"
          @click="handleReset"
        />
        <button class="dropdown-icon inline-flex focus:outline-none" ref="dropdownButton" @click="handleButtonClick">
          <Icon name="chevron-down" aria-label="Toggle Dropdown" class="text-xl" />
        </button>
      </div>
    </div>
    <ul
      :id="listboxId"
      class="options-listbox border-t border-gray-300 dark:border-gray-700"
      role="listbox"
      ref="listbox"
    >
      <li class="option-listitem text-center" v-if="filteredOptions.length === 0">No option matches your search</li>
      <li
        :id="`${option}-option-${++i}`"
        :key="option"
        :aria-selected="selected === option"
        :data-idx="--i"
        tabindex="-1"
        role="option"
        class="option-listitem"
        v-for="(option, i) in filteredOptions"
        @click="handleOptionClick"
        @mouseenter="handleMouseOver"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import cuid from 'cuid';
import { ref, watch } from 'vue';
import Icon from '../../components/Icon.vue';
import { KeyCode, killEvent } from '../../utils';

export type Option = string;
export enum Navigation {
  CIRCULAR = 'circular',
  LINEAR = 'linear',
}

export default {
  name: 'Select',
  components: { Icon },
  props: {
    title: { type: String, default: 'Search to filter' },
    navigation: { type: String, default: Navigation.LINEAR },
    id: { type: String, default: null },
    options: { type: Array, default: ['select'] },
    onFold: { type: Function, default: () => null },
    onUnfold: { type: Function, default: () => null },
    onChange: { type: Function, default: () => null },
  },

  setup() {
    const select = ref<HTMLInputElement>(null!);
    const listbox = ref<HTMLUListElement>(null!);
    const dropdownButton = ref<HTMLButtonElement>(null!);
    const listboxId = cuid();
    const comboboxId = cuid();
    const comboboxWrapperId = cuid();
    return { select, listbox, listboxId, comboboxId, comboboxWrapperId, dropdownButton };
  },

  data() {
    const expanded = false;
    const selected = '';
    const selectedApproved = false;
    const formerSelected = '';
    const activeDescendant: HTMLElement = null!;
    const formerActiveDescendant: HTMLElement = null!;
    const filteredOptions = this.$props.options as string[];
    return {
      expanded,
      selected,
      selectedApproved,
      formerSelected,
      filteredOptions,
      activeDescendant,
      formerActiveDescendant,
    };
  },

  methods: {
    open() {
      this.$data.filteredOptions = this.$props.options as string[];
      this.$data.selectedApproved = false;
      this.select.focus();
    },

    close() {
      this.clear();
      this.select.blur();
      this.dropdownButton.focus();
    },

    clear() {
      if (!this.$data.selectedApproved) {
        this.$data.selected = this.$data.formerSelected;
        this.$data.activeDescendant = this.$data.formerActiveDescendant;
      }
    },

    approve() {
      this.$data.selectedApproved = true;
      this.$props.onChange(this.$data.selected);
    },

    handleOptionClick(e: MouseEvent) {
      const target = e.currentTarget as HTMLElement;
      this.$data.activeDescendant = target;
      this.approve();
      this.$data.expanded = false;
    },

    handleButtonClick() {
      this.$data.expanded = !this.$data.expanded;
    },

    handleReset() {
      this.$data.selected = '';
      this.$data.activeDescendant = null!;
    },

    handleFocus() {
      this.$data.formerSelected = this.$data.selected;
      this.$data.formerActiveDescendant = this.$data.activeDescendant;
      this.$data.expanded = true;
    },

    handleBlur(e: FocusEvent) {
      const focused = e.relatedTarget;
      if (focused === this.dropdownButton || this.listbox.contains(focused as Node)) return;
      this.$data.expanded = false;
      this.clear();
    },

    filterOptions(evt: KeyboardEvent) {
      // Use setTimeout to run after the browser has painted
      setTimeout(() => {
        const target = evt.target as HTMLInputElement;
        const options = this.$props.options as string[];
        const selected = target.value.replace(/\\/g, '\\\\');

        if (selected.length === 0) return (this.$data.filteredOptions = options);

        const pattern = new RegExp(selected, 'i');
        const filtered = options.filter(option => option.match(pattern) !== null);
        this.$data.filteredOptions = filtered;
      });
    },

    handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      this.$data.activeDescendant = target;
    },

    keyHandler(e: KeyboardEvent) {
      if (!this.$data.expanded) return;
      const navigation = this.$props.navigation as Navigation;
      const items = this.listbox.children;

      const getNextItem = (navigation: Navigation, items: HTMLCollection, active: HTMLElement, downward: boolean) => {
        const maxOptionIndex = items.length - 1;
        switch (navigation) {
          case Navigation.CIRCULAR: {
            const next = items.item(downward ? 0 : maxOptionIndex) as HTMLElement | null;
            return next ?? active;
          }
          case Navigation.LINEAR:
          default: {
            return active;
          }
        }
      };

      switch (e.keyCode) {
        case KeyCode.DOWN: {
          if (!this.$data.activeDescendant) {
            this.$data.activeDescendant = this.listbox.children.item(0) as HTMLElement;
            killEvent(e, true);
            break;
          }
          const active = this.$data.activeDescendant;
          const next = active.nextElementSibling as HTMLElement | null;
          this.$data.activeDescendant = next ?? getNextItem(navigation, items, active, true);
          killEvent(e, true);
          break;
        }

        case KeyCode.UP: {
          const active = this.$data.activeDescendant;
          const prev = active.previousElementSibling as HTMLElement | null;
          this.$data.activeDescendant = prev ?? getNextItem(navigation, items, active, false);
          killEvent(e, true);
          break;
        }

        case KeyCode.ESCAPE: {
          this.close();
          killEvent(e, true);
          break;
        }

        case KeyCode.ENTER: {
          this.approve();
          this.close();
          killEvent(e, true);
          break;
        }
      }
    },

    registerKeyNav() {
      this.select.addEventListener('keydown', this.keyHandler, { capture: true });
      this.select.addEventListener('keydown', this.filterOptions);
    },

    unregisterKeyNav() {
      this.select.removeEventListener('keydown', this.keyHandler, { capture: true });
      this.select.removeEventListener('keydown', this.filterOptions);
    },

    registerFocus() {
      // this.select.addEventListener('focus')
    },

    expand({ maxHeight }: { maxHeight: number }) {
      const dropdownIcon = this.dropdownButton.firstChild;
      this.registerKeyNav();
      this.open();

      gsap.to(dropdownIcon, { rotateZ: 180, transformOrigin: 'center', ease: 'power.out' });
      gsap.set(this.listbox, { display: 'block', maxHeight: 0 });
      gsap.to(this.listbox, {
        onStart: () => this.$props.onUnfold(),
        maxHeight: maxHeight,
        ease: 'power.out',
        duration: 0.3,
        onComplete: () => gsap.set(this.listbox, { overflow: 'auto' }),
      });
    },

    collapse() {
      const dropdownIcon = this.dropdownButton.firstChild;
      this.unregisterKeyNav();
      this.close();

      gsap.to(dropdownIcon, { rotateZ: 0, transformOrigin: 'center', ease: 'power.out' });
      gsap.set(this.listbox, { overflow: 'hidden' });
      gsap.to(this.listbox, {
        maxHeight: 0,
        ease: 'power.out',
        duration: 0.2,
        onComplete: () => {
          gsap.set(this.listbox, { display: 'none' });
          this.$props.onFold();
        },
      });
    },
  },

  mounted() {
    const maxHeight = parseInt(getComputedStyle(this.listbox).maxHeight);
    const expansionObserver = (expanded: boolean) => (expanded ? this.expand({ maxHeight }) : this.collapse());
    const activeObserver = (to: HTMLElement | null, from: HTMLElement | null) => {
      const options = this.$props.options as Option[];
      if (from !== null) {
        from.classList.remove('active');
        from.setAttribute('tabindex', '-1');
      }

      if (to === null) return;

      to.classList.add('active');
      to.setAttribute('tabindex', '0');
      this.$data.selected = options[Number(to.dataset.idx)];
    };

    gsap.set(this.listbox, { display: 'none' });
    watch(() => this.$data.activeDescendant, activeObserver);
    watch(() => this.$data.expanded, expansionObserver);
  },
};
</script>

<style lang="postcss">
.searchable-input {
  @apply w-full appearance-none px-4 py-2 md:py-3;
  background: inherit;
}

.dropdown-icon {
  @apply px-4 py-2 md:py-3;
}

.options-listbox {
  @apply absolute w-full shadow-2xl overflow-auto rounded-md rounded-t-none;
  max-height: 250px;
  background: inherit;
}

.option-listitem {
  @apply cursor-pointer block w-full px-4 py-2 overflow-hidden focus:outline-none;
}

.option-listitem.active {
  @apply bg-gray-300 dark:bg-gray-800 bg-opacity-70 focus:outline-none;
}
</style>
