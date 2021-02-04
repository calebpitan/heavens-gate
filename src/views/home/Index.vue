<template>
  <AppTheme>
    <div class="h-full">
      <div class="flex flex-col h-full">
        <Header
          class="p-4 lg:px-6"
          ref="appHeader"
          :title="navigation.title"
          :loggedIn="loggedIn"
          :canNavigate="navigation.canNavigate"
        />

        <div class="p-4 lg:px-6 overflow-auto" :style="{ height: `${contentWindowHeight}px` }">
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

        <BottomNavigation ref="appBottomNav" />
      </div>
    </div>
  </AppTheme>
</template>

<script lang="ts">
import gsap from 'gsap';
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';
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

    const headerLayout = reactive<DOMRect>(null!);
    const bottomNavLayout = reactive<DOMRect>(null!);
    const windowHeight = ref(0);
    const contentWindowHeight = ref(0);

    return { loggedIn, navigation, headerLayout, bottomNavLayout, windowHeight, contentWindowHeight };
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

    getHeader() {
      return this.$refs.appHeader.$refs.header as HTMLElement;
    },

    getBottomNav() {
      return this.$refs.appBottomNav.$refs.bottomNav as HTMLElement;
    },

    recordLayoutSize() {
      const header = this.getHeader();
      const bottomNav = this.getBottomNav();
      this.headerLayout = header.getBoundingClientRect();
      this.bottomNavLayout = bottomNav.getBoundingClientRect();
      this.windowHeight = document.body.offsetHeight;
    },

    registerResizeHandler() {
      window.addEventListener('resize', this.recordLayoutSize);
    },

    unregisterResizeHandler() {
      window.removeEventListener('resize', this.recordLayoutSize);
    },
  },

  mounted() {
    type RouteObserver = <T extends RouteLocationNormalizedLoaded>(to: T, from: T) => void;
    const routeObserver: RouteObserver = (to, from) => {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      const effect = toDepth > fromDepth ? 'slide-left' : 'slide-right';
      this.$data.effect = effect;
    };

    this.recordLayoutSize();
    this.registerResizeHandler();

    watchEffect(() => {
      const apparentHeaderHeight = this.headerLayout.bottom;
      const apparentBottomNavHeight = this.windowHeight - this.bottomNavLayout.top;
      this.contentWindowHeight = this.windowHeight - (apparentHeaderHeight + apparentBottomNavHeight);
    });

    watch(() => this.$route, routeObserver);
  },

  unmounted() {
    this.unregisterResizeHandler();
  },
};
</script>
