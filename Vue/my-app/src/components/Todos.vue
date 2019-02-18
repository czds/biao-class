<template>
  <div class="todos">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"/>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "Todos",
  components: {
    TodoItem
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    }
  }
};
</script>

<style scoped>
</style>
