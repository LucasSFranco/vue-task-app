<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script>
import { gsap } from 'gsap';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransitionCard',
  methods: {
    enter(el, done) {
      gsap.set(el, {
        translateY: '-70px',
        opacity: 0,
        scale: 1.05,
      });
      gsap.to(el, {
        duration: 0.25,
        ease: 'back.out',
        delay: 0.25,
        translateY: 0,
        opacity: 1,
        scale: 1,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.25,
        ease: 'back.in',
        translateY: '-70px',
        opacity: 0,
        scale: 1.05,
        onComplete: done,
      });
    },
  },
});
</script>

<style scoped lang="sass"></style>
