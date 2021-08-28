<template>
<div class="welcome">
  <div>
    <h1>Welcome to Tweeter!</h1>
    <h3>Sign up or log in below</h3>
  </div>
  <div>
    <LandingPage/>
  </div>
</div>
  
</template>

<script>

import LandingPage from '../components/LandingPage.vue'
  export default {
    name: 'Home',

    components: {
        LandingPage,
    },
  }
</script>

<style scoped>
.welcome {
  background-color: lightgreen;
}

</style>

