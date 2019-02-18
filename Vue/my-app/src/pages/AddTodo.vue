<template>
  <form @submit.prevent="addTodo">
    <input type="text" v-model="title" name="title" placeholder="Add Todo ...">
    <input type="submit" value="Submit" class="btn">
  </form>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
      number: 10
    };
  },
  methods: {
    addTodo() {
      if (!this.title) return;
      this.number++;
      const newTodo = {
        id: this.number,
        title: this.title,
        completed: false
      };
      this.$store.commit("addTodo", newTodo);
      this.title = "";
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  padding-top: 0.4rem;
}
form input {
  box-sizing: border-box;
  height: 2rem;
  padding: 0 0.6rem;
  border: 1px solid #999;
  outline: 0;
  flex-grow: 10;
}
.btn {
  border-left: 0;
  flex-grow: 2;
  background-color: #eee;
}
</style>
