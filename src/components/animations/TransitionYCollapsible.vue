<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="wrapper">
      <slot />
    </div>
  </transition>
</template>

<script>
import { gsap } from 'gsap';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransitionYCollapsible',
  methods: {
    enter(el, done) {
      gsap.set(el, {
        height: 0,
      });
      gsap.to(el, {
        duration: 0.5,
        ease: 'back.out',
        height: el.scrollHeight,
        onComplete: () => {
          el.style.height = 'auto';
          done();
        },
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.5,
        ease: 'back.in',
        height: 0,
        onComplete: () => {
          el.style.height = 'auto';
          done();
        },
      });
    },
  },
});
</script>

<style scoped lang="sass">

  .wrapper
    overflow: hidden

</style>
