<template>
  <teleport to="#popup-layer">
    <div
      ref="dropdown"
      class="dropdown"
      @click.self.stop
    >
      <slot />
    </div>
  </teleport>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppDropdown',
  props: {
    id: {
      type: String,
      required: true,
    },
    spacing: {
      default: 8,
      type: Number,
    },
    direction: {
      type: String,
      required: true,
      validator(value) {
        return ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']
          .indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      show: false,
      dropdown: null,
      trigger: null,
    };
  },
  mounted() {
    this.dropdown = this.$refs.dropdown;
    this.trigger = document.querySelector(`#target-${this.id}`);

    this.trigger.addEventListener('click', this.handleClick);
  },
  beforeUnmount() {
    this.trigger.removeEventListener('click', this.handleClick);
  },
  methods: {
    handleClick(event) {
      event.stopPropagation();

      this.dropdown.classList.toggle('show');

      const triggerBox = this.trigger.getBoundingClientRect();
      const dropdownBox = this.dropdown.getBoundingClientRect();

      switch (this.direction) {
        case 'top-right':
          this.dropdown.style.top = `${
            triggerBox.y - dropdownBox.height - this.spacing
          }px`;
          this.dropdown.style.left = `${
            triggerBox.x - triggerBox.width
          }px`;
          break;
        case 'top':
          this.dropdown.style.top = `${
            triggerBox.y - dropdownBox.height - this.spacing
          }px`;
          this.dropdown.style.left = `${
            triggerBox.x + triggerBox.width / 2 - dropdownBox.width / 2
          }px`;
          break;
        case 'top-left':
          this.dropdown.style.top = `${
            triggerBox.y - dropdownBox.height - this.spacing
          }px`;
          this.dropdown.style.left = `${
            triggerBox.x + triggerBox.width - dropdownBox.width
          }px`;
          break;
        case 'bottom-right':
          this.dropdown.style.top = `${
            triggerBox.y + triggerBox.height + this.spacing
          }px`;
          this.dropdown.style.left = `${
            triggerBox.x - triggerBox.width
          }px`;
          break;
        case 'bottom':
          this.dropdown.style.top = `${
            triggerBox.y + triggerBox.height + this.spacing
          }px`;
          this.dropdown.style.left = `${
            triggerBox.x + triggerBox.width / 2 - dropdownBox.width / 2
          }px`;
          break;
        case 'bottom-left':
          this.dropdown.style.top = `${
            triggerBox.y + triggerBox.height + this.spacing
          }px`;
          this.dropdown.style.left = `${
            triggerBox.x + triggerBox.width - dropdownBox.width
          }px`;
          break;
        default:
          break;
      }
    },
  },
});
</script>

<style scoped lang="sass">

  .dropdown
    min-width: 120px
    max-width: 200px

    display: flex
    flex-direction: column

    background: var(--BACKGROUND_FLOATING)
    border-radius: 4px
    box-shadow: var(--ELEVATION_FLOATING)
    padding: 6px 8px
    pointer-events: auto
    position: fixed
    visibility: hidden
    z-index: 99

    &.show
      visibility: visible

</style>
