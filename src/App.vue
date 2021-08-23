<template>
  <div>
    <LogInRegister/>
  </div>
</template>

<script>
import LogInRegister from './components/LogInRegister.vue'
export default {
  name: 'App',
  components: {
    LogInRegister,
    
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
template {
  background-color:lightgreen;
}
</style>
