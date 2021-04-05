<template>
  <div class="card">
    <Header />
    <AddTaskForm />
    <TaskList />
  </div>
</template>

<script>
import { AddTaskForm, Header, TaskList } from '@/components';

export default {
  name: 'App',
  components: {
    AddTaskForm,
    Header,
    TaskList,
  },
};
</script>

<style lang="sass">

html,
body,
#app
  width: 100%
  height: 100%

*
  border: 0
  margin: 0
  outline: 0
  padding: 0

  background: none
  box-sizing: border-box
  list-style: none
  resize: none
  text-decoration: none
  user-select: none

  font-family: "Poppins", sans-serif
  font-size: 16px
  line-height: 1.2

#app
  display: flex
  align-items: center
  justify-content: center

  background: #202225
  padding: 16px

.card
  height: 100%
  width: 100%

  display: flex
  flex-direction: column

  background: #36393f
  border-radius: 8px

  @media only screen and (min-width: 640px)
    &
      height: 80%

      max-width: 608px
      max-height: 608px
</style>
