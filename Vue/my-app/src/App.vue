<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from "./pages/Header";
import axios from "axios";

export default {
  name: "app",
  components: {
    Header
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(r => this.$store.commit("changeTodos", r.data))
      .catch(err => console.log(err));
  }
};
</script>

<style>
* {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #222;
}
</style>

<style scoped>
#app {
  margin: 1rem 0.2rem;
  padding: 0.6rem;
  max-width: 600px;
}
</style>

