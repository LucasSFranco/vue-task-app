<template>
  <div class="radio-group__bar">
    <input
      v-bind="$attrs"
      :id="id"
      type="radio"
    >
    <label :htmlfor="id">
      <inline-svg
        :src="require('../assets/custom-checkbox.svg')"
      />
      <div class="content">
        <slot />
        <div class="extra">
          <slot name="extra" />
        </div>
      </div>
    </label>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import InlineSvg from 'vue-inline-svg';

export default defineComponent({
  name: 'AppRadioGroupBar',
  components: {
    InlineSvg,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="sass">

  .radio-group__bar
    input[type="radio"]
      display: none

      &:checked + label
        background: var(--BACKGROUND_TERTIARY)
        color: var(--INTERACTIVE_SELECTED)

        .custom-checkbox
          ::v-deep
            .checked
              fill: var(--CUSTOM_CHECKBOX_CHECKED)

    label
      width: 100%

      display: flex
      align-items: center

      background: var(--BACKGROUND_SECONDARY)
      border-radius: 4px
      color: var(--INTERACTIVE_NORMAL)
      cursor: pointer
      font-size: 14px
      padding: 10px

      &:hover
        background: var(--BACKGROUND_MODIFIER_HOVER)
        color: var(--INTERACTIVE_HOVER)

      &:active
        background: var(--BACKGROUND_MODIFIER_ACTIVE)
        color: var(--INTERACTIVE_ACTIVE)

      .custom-checkbox
        ::v-deep
          .checked
            fill: transparent

      .content
        display: flex
        align-items: center
        justify-content: space-between

        flex-grow: 1
        margin-left: 10px

        .extra
          display: flex
          align-items: center

          ::v-deep
            small
              display: none

              @media only screen and (min-width: 640px)
                &
                  display: initial

                  font-size: 12px
                  font-weight: 300

            img
              margin-left: 8px
              width: 27px
              height: 18px

</style>
