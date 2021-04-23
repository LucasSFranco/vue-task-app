<template>
  <div class="radio-group">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppRadioGroup',
});
</script>

<style scoped lang="sass">

  .radio-group
    ::v-deep
      > * + *
        margin-top: 8px

</style>
