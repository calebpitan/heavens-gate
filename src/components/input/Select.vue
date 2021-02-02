<template>
  <div dir="auto">
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
    <ul :id="listboxId" class="options-listbox" role="listbox" ref="listbox">
      <li class="option-listitem text-center" v-if="filteredOptions.length === 0">No option matches your search</li>
      <li
        :id="`${option}-option-${++i}`"
        :key="option"
        :aria-selected="selected === option"
        tabindex="-1"
        role="option"
        class="option-listitem"
        v-for="(option, i) in filteredOptions"
        @click="(selected = option), (selectedApproved = true)"
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
import { KeyCode } from '../../utils/keycode';

export default {
  name: 'Select',
  components: { Icon },
  props: {
    title: { type: String, default: 'Search to filter' },
    options: { type: Array, default: ['select'] },
  },

  setup() {
    const select = ref<HTMLInputElement>(null!);
    const listbox = ref<HTMLUListElement>(null!);
    const dropdownButton = ref<HTMLButtonElement>(null!);
    const listboxId = cuid();
    const comboboxId = cuid();
    return { select, listbox, listboxId, comboboxId, dropdownButton };
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

    handleButtonClick() {
      !this.$data.expanded ? this.open() : this.close();
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

    handleBlur() {
      // This prevent handleButtonClick and handleBlur from firing when button is clicked.
      // In which handleBlur will fire before handleButtonClick and would eventually cause no change in state
      setTimeout(() => (this.$data.expanded = false), 400);
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
      const handled = (e: Event) => (e.stopImmediatePropagation(), e.preventDefault());
      switch (e.keyCode) {
        case KeyCode.DOWN: {
          if (!this.$data.activeDescendant) {
            this.$data.activeDescendant = this.listbox.children.item(0) as HTMLElement;
            handled(e);
            return;
          }
          const active = this.$data.activeDescendant;
          const next = active.nextElementSibling as HTMLElement | null;
          this.$data.activeDescendant = next ?? active;
          handled(e);
          break;
        }

        case KeyCode.UP: {
          const active = this.$data.activeDescendant;
          const prev = active.previousElementSibling as HTMLElement | null;
          this.$data.activeDescendant = prev ?? active;
          handled(e);
          break;
        }

        case KeyCode.ESCAPE: {
          this.close();
          handled(e);
          break;
        }

        case KeyCode.ENTER: {
          this.$data.selectedApproved = true;
          this.close();
          handled(e);
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
  },

  mounted() {
    const dropdownIcon = this.dropdownButton.firstChild;
    const maxHeight = parseInt(getComputedStyle(this.listbox).maxHeight);
    gsap.set(this.listbox, { display: 'none' });

    watch(
      () => this.$data.activeDescendant,
      (to, from) => {
        if (from !== null) {
          from.classList.remove('active');
          from.setAttribute('tabindex', '-1');
        }

        if (to === null) return;

        to.classList.add('active');
        to.setAttribute('tabindex', '0');
        this.$data.selected = to.innerText;
      },
    );

    watch(
      () => this.$data.expanded,
      expanded => {
        if (expanded) {
          this.registerKeyNav();
          this.open();

          gsap.to(dropdownIcon, { rotateZ: 180, transformOrigin: 'center', ease: 'power.out' });
          gsap.set(this.listbox, { display: 'block', maxHeight: 0 });
          gsap.to(this.listbox, {
            maxHeight: maxHeight,
            ease: 'power.out',
            onComplete: () => gsap.set(this.listbox, { overflow: 'auto' }),
          });
          return;
        }

        this.unregisterKeyNav();
        this.close();

        gsap.to(dropdownIcon, { rotateZ: 0, transformOrigin: 'center', ease: 'power.out' });
        gsap.set(this.listbox, { overflow: 'hidden' });
        gsap.to(this.listbox, {
          maxHeight: 0,
          ease: 'power.out',
          onComplete: () => gsap.set(this.listbox, { display: 'none' }),
        });
      },
    );
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
  @apply overflow-auto relative rounded-md rounded-t-none;
  max-height: 250px;
}

.option-listitem {
  @apply cursor-pointer block w-full px-4 py-2 overflow-hidden focus:outline-none;
}

.option-listitem.active {
  @apply bg-gray-300 dark:bg-gray-800 bg-opacity-70 focus:outline-none;
}
</style>
