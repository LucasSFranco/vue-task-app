<template>
  <div
    id="popup-layer"
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppPopupLayer',
});
</script>

<style scoped lang="sass">

  #popup-layer
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0

    pointer-events: none

</style>
