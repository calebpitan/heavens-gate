<template>
  <div
    class="fixed bottom-0 lg:bottom-6 flex mt-auto bg-white dark:bg-gray-700 w-full lg:w-auto lg:rounded-full lg:self-center lg:shadow-2xl lg:space-x-4"
    ref="bottomNav"
  >
    <BottomNavPill class="nav-pill" icon="home" itemName="Home" navTo="/" />
    <BottomNavPill class="nav-pill" icon="search" itemName="Search" navTo="/search" />
    <BottomNavPill class="nav-pill" icon="plus" itemName="New" navTo="/new" />
    <BottomNavPill class="nav-pill" icon="shopping-cart" itemName="Cart" navTo="/cart" />
    <BottomNavPill class="nav-pill" icon="user" itemName="Profile" navTo="/user" />
  </div>
</template>

<script lang="ts">
import BottomNavPill from './BottomNavPill.vue';

export default {
  components: { BottomNavPill },
  name: 'BottomNavigation',
};
</script>

<style lang="postcss" scoped>
.nav-pill {
  @apply mx-auto;
}
.nav-pill:first-of-type {
  @apply lg:rounded-l-full;
}

.nav-pill:last-of-type {
  @apply lg:rounded-r-full;
}
</style>
