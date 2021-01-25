<template>
  <div class="p-4">
    <div class="header bg-white rounded-md">
      <header class="flex w100">
        <div class="flex flex-grow">
          <router-link
            to="/"
            class="px-4 py-2 text-black font-semibold rounded-l-md hover:text-white hover:bg-black transition-all duration-500"
          >
            Home
          </router-link>
        </div>
        <div class="flex">
          <router-link
            to="/login"
            class="px-4 py-2 text-black font-semibold hover:text-white hover:bg-black transition-all duration-500"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="px-4 py-2 text-black font-semibold rounded-r-md hover:text-white hover:bg-black transition-all duration-500"
          >
            Signup
          </router-link>
        </div>
      </header>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Header',
};
</script>
