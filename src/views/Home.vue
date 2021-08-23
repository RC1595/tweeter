<template>
<div>
  <div>
    <h1>Welcome to Tweeter!</h1>
    <h3>Sign up or log in below</h3>
  </div>
  <div>
    <LogInRegister/>
  </div>
</div>
  
</template>

<script>
  import LogInRegister from '../components/LogInRegister.vue'
  export default {
    name: 'Login-Register',

    components: {
      LogInRegister,
    },
  }
</script>
