<template>
  <AppTheme>
    <div class="h-full">
      <div class="flex flex-col h-full">
        <Header
          class="p-4 lg:px-6"
          :title="navigation.title"
          :loggedIn="loggedIn"
          :canNavigate="navigation.canNavigate"
        />

        <div class="p-4 lg:px-6">
          <router-view class="mb-16 lg:mb-20" v-slot="{ Component }">
            <transition
              :css="false"
              @before-enter="beforeEnter"
              @before-leave="beforeLeave"
              @enter="enter"
              @leave="leave"
              @after-enter="afterEnter"
              @after-leave="afterLeave"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>

        <BottomNavigation />
      </div>
    </div>
  </AppTheme>
</template>

<script lang="ts">
import gsap from 'gsap';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppTheme from '../../components/AppTheme.vue';
import BottomNavigation from '../../components/nav/BottomNavigation.vue';
import Header from '../../components/Header.vue';
import { useStore } from 'vuex';
import { RootState } from '../../store/types';

export default {
  name: 'Home',
  components: { Header, AppTheme, BottomNavigation },
  data() {
    const effect = 'fade';
    return { effect };
  },

  setup() {
    const store = useStore<RootState>();
    const router = useRouter();
    const route = useRoute();
    const loggedIn = computed(() => store.state.auth.data.loggedIn);
    const navigation = computed(() => ({ title: route.name, canNavigate: !!router.history.state.back }));
    return { loggedIn, navigation };
  },

  methods: {
    beforeEnter(el: HTMLElement) {
      gsap.set(el, { translateX: '-100%', position: 'absolute' });
    },

    beforeLeave(el: HTMLElement) {
      gsap.set(el, { position: 'absolute' });
    },

    enter(el: HTMLElement, done: () => void) {
      gsap.to(el, {
        translateX: 0,
        duration: 0.2,
        onComplete: done,
        ease: 'slow',
      });
    },

    leave(el: HTMLElement, done: () => void) {
      gsap.to(el, {
        translateX: '-100%',
        duration: 0.2,
        onComplete: done,
        ease: 'power.out',
      });
    },

    afterEnter(el: HTMLElement) {
      gsap.set(el, { position: 'initial' });
    },

    afterLeave(el: HTMLElement) {
      gsap.set(el, { position: 'initial' });
    },
  },

  mounted() {
    watch(
      () => this.$route,
      (to, from) => {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        const effect = toDepth > fromDepth ? 'slide-left' : 'slide-right';
        this.$data.effect = effect;
      },
    );
  },
};
</script>
