<template>
<div>
  <div>
    <h1>Welcome to your Tweeter profile!</h1>
  </div>
  <div id='profileCard'>
    <UserProfile/>
    <CreateTweet/>
  </div>
</div>
  
</template>

<script>
  import UserProfile from '../components/UserProfile.vue'
  import CreateTweet from '../components/CreateTweet.vue'
  export default {
    name: 'Profile',
    components: {
      UserProfile,
      CreateTweet}
  }
</script>

<style scoped>
  #profileCard {
    align-items: center;
  }

</style>