<template>
  <div class="tasks__header">
    <div class="toggler-wrapper configs">
      <AppToggler
        secondary
        @click="$router.push('/configs')"
      >
        <i class="fas fa-cog" />
      </AppToggler>
    </div>
    <AppTitle>
      {{ $t('tasks.header.title') }}
    </AppTitle>
    <AppSubtitle>
      {{ $t('tasks.header.subtitle') }}
    </AppSubtitle>
    <div class="toggler-wrapper task-form">
      <AppToggler
        success
        class="toggler-add-task-form"
        :class="{'selected': isAddingTask}"
        @click="toggleAddTaskState"
      >
        <i class="fas fa-plus" />
      </AppToggler>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

import AppToggler from '@/components/AppToggler.vue';
import AppSubtitle from '@/components/AppSubtitle.vue';
import AppTitle from '@/components/AppTitle.vue';

export default defineComponent({
  name: 'TasksHeader',
  components: {
    AppToggler,
    AppSubtitle,
    AppTitle,
  },
  computed: {
    ...mapState('tasks', [
      'isAddingTask',
    ]),
  },
  methods: {
    ...mapActions('tasks', [
      'toggleAddTaskState',
    ]),
  },
});
</script>

<style scoped lang="sass">

  .tasks__header
    position: relative

    border-bottom: 1px solid var(--BACKGROUND_MODIFIER_ACCENT)
    margin: 32px 24px 24px
    padding-bottom: 24px

    .toggler-wrapper
      width: 32px
      height: 32px

      position: absolute
      bottom: -16px

      background: var(--BACKGROUND_PRIMARY)
      border-radius: 50%

      &.configs
        left: 0

      &.task-form
        right: 0

</style>
