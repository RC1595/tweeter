<template>
<div>
  <div>
    <h1>Welcome to your Tweeter profile!</h1>
  </div>
  <div id='profileCard'>
    <UserProfile/>
  </div>
  <div>
    <CreateTweet/>
  </div>
  <div>
    <TweetFeed/>
  </div>
</div>
  
</template>

<script>
  import UserProfile from '../components/UserProfile.vue'
  import CreateTweet from '../components/CreateTweet.vue'
  import TweetFeed from '../components/TweetFeed.vue'
  export default {
    name: 'Profile',
    components: {
      UserProfile,
      CreateTweet,
      TweetFeed}
  }
</script>

<style scoped>
  #profileCard {
    align-items: center;
  }

</style>