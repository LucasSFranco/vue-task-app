<template>
  <div class="tasks__footer">
    <AppSubtext>
      {{ $t('tasks.footer.itemsLeft') }}&nbsp;
      <span style="width: 20px">
        <AnimationNumber :number="pendingTasksCount" />
      </span>
    </AppSubtext>
    <AppToggler
      id="target-tasks-tabs-dropdown"
      secondary
    >
      <i class="fas fa-bars" />

      <AppDropdown
        id="tasks-tabs-dropdown"
        direction="top-left"
      >
        <AppDropdownItem
          v-for="(tab, tabId) in tabs"
          :key="tabId"
          :class="{selected: tabId === currentTabId}"
          @click="changeCurrentTab(tabId)"
        >
          {{ $t(`tasks.footer.tabs.${tabId}`) }}
        </AppDropdownItem>
      </AppDropdown>
    </AppToggler>

    <AppTabControl>
      <AppTabControlButton
        v-for="(tab, tabId) in tabs"
        :key="tabId"
        :class="{selected: tabId === currentTabId}"
        @click="changeCurrentTab(tabId)"
      >
        {{ $t(`tasks.footer.tabs.${tabId}`) }}
      </AppTabControlButton>
    </AppTabControl>
    <AppLink @click="clearCompletedTasks">
      {{ $t('tasks.footer.clearCompletedButton') }}
    </AppLink>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

import AppDropdown from '@/components/AppDropdown.vue';
import AppDropdownItem from '@/components/AppDropdownItem.vue';
import AppLink from '@/components/AppLink.vue';
import AppSubtext from '@/components/AppSubtext.vue';
import AppTabControl from '@/components/AppTabControl.vue';
import AppTabControlButton from '@/components/AppTabControlButton.vue';
import AppToggler from '@/components/AppToggler.vue';
import AnimationNumber from '@/components/animations/AnimationNumber.vue';

export default defineComponent({
  name: 'TasksHeader',
  components: {
    AppDropdown,
    AppDropdownItem,
    AppLink,
    AppSubtext,
    AppTabControl,
    AppTabControlButton,
    AppToggler,
    AnimationNumber,
  },
  computed: {
    ...mapGetters('tasks', [
      'currentTabId',
      'tabs',
    ]),
    ...mapState('tasks', [
      'pendingTasksCount',
    ]),
  },
  methods: {
    ...mapActions('tasks', [
      'changeCurrentTab',
      'clearCompletedTasks',
    ]),
  },
});
</script>

<style scoped lang="sass">

  .tasks__footer
    height: 48px

    display: flex
    align-items: center
    justify-content: space-between

    margin: 0 24px

    .tab-control
      display: none

    .link
      display: none

    @media only screen and (min-width: 640px)
      &
        height: 32px

        .toggler
          display: none

        .tab-control
          display: inherit

        .link
          display: inherit

    .link, .subtext
      color: var(--TEXT_SECONDARY)
      font-size: 12px
      font-weight: 400

</style>
