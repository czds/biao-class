<template>
  <div class="todo-item" :class="{'is-complete':todo.completed}">
    <input type="checkbox" v-model="todo.completed">
    {{todo.title}}
    <button @click="deleteTodo(todo.id)" class="del">X</button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object
  },
  methods: {
    deleteTodo(id) {
      const newtodos = this.$store.state.todos.filter(todo => todo.id !== id);
      this.$store.commit("changeTodos", newtodos);
    }
  }
};
</script>

<style scoped>
.is-complete {
  text-decoration: line-through;
}
input[type="checkbox"] {
  margin-right: 1rem;
}
.todo-item {
  padding: 0.5rem;
  background-color: rgb(250, 230, 230);
  border: 1px dashed #999;
  border-top: 0;
}
.del {
  float: right;
  border-radius: 50%;
  padding: 0.2rem;
  border: 0;
  background-color: orangered;
}
</style>
