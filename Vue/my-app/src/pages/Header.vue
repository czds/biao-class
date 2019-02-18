<template>
  <header class="header">
    <h1>TodoList</h1>
    <div class="nav">
      <router-link to="/">主页</router-link>
      |
      <router-link to="/about">关于</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
header {
  text-align: center;
}
a {
  text-decoration: none;
  color: royalblue;
}
h1 {
  margin-top: -1rem;
}
</style>

