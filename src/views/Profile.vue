<template>
<div>
  <PageHeader/>
  <v-spacer></v-spacer>
  <div>
    <h1>Welcome to your Tweeter profile!</h1>
  </div>
  <div id='profileCard'>
    <UserProfile :userId="userId"/>
    {{$route.params.id}}
  </div>
  <div>
    <CreateTweet/>
  </div>
  <div>
    <TweetFeed :userId="userId"/>
  </div>
</div>
  
</template>

<script>
  import cookies from 'vue-cookies'
  import PageHeader from '../components/PageHeader.vue'
  import UserProfile from '../components/UserProfile.vue'
  import CreateTweet from '../components/CreateTweet.vue'
  import TweetFeed from '../components/TweetFeed.vue'
  export default {
    name: 'Profile',
    components: {
      PageHeader,
      UserProfile,
      CreateTweet,
      TweetFeed},
      data() {
        return {
          userId: cookies.get('userId')
        }
      },
  }
</script>

<style scoped>
  #profileCard {
    align-items: center;
  }

</style>