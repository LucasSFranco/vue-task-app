<template>
  <transition-group
    :css="false"
    @beforeEnter="hideOverflow"
    @enter="enter"
    @afterEnter="showOverflow"
    @beforeLeave="hideOverflow"
    @leave="leave"
    @afterLeave="showOverflow"
  >
    <slot />
  </transition-group>
</template>

<script>
import { gsap } from 'gsap';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransitionStackedList',
  methods: {
    enter(el, done) {
      gsap.set(el, {
        height: 0,
        opacity: 0,
      });
      gsap.to(el, {
        duration: 0.5,
        ease: 'none',
        height: el.scrollHeight,
        opacity: 1,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.5,
        ease: 'none',
        height: 0,
        opacity: 0,
        onComplete: done,
      });
    },
    hideOverflow(el) {
      gsap.set(el.querySelector('time'), {
        visibility: 'hidden',
      });
      gsap.set(el, {
        overflow: 'hidden',
      });
    },
    showOverflow(el) {
      gsap.set(el.querySelector('time'), {
        visibility: '',
      });
      gsap.set(el, {
        overflow: 'visible',
      });
    },
  },
});
</script>

<style scoped lang="sass"></style>
