<template>
  {{ animatedNumber }}
</template>

<script>
import { gsap } from 'gsap';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransitionStackedList',
  props: {
    number: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tweenedNumber: 0,
    };
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    },
  },
  watch: {
    number(newValue) {
      gsap.to(this.$data, { duration: 1, tweenedNumber: newValue });
    },
  },
  mounted() {
    this.tweenedNumber = this.number;
  },
});
</script>

<style scoped lang="sass"></style>
