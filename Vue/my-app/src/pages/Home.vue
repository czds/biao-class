<template>
  <div id="home">
    <AddTodo/>
    <Todos/>
  </div>
</template>

<script>
import AddTodo from "./AddTodo";
import Todos from "../components/Todos";

export default {
  name: "Home",
  components: {
    Todos,
    AddTodo
  }
};
</script>

