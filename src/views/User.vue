<template>
<div>
    <div>
        <PageHeader/>
    </div>
    <div>
        <UserProfile :userId="userId"/>
    </div>
    <div>
        <TweetFeed :userId="userId"/>
        <TweetComments/>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
import UserProfile from '../components/UserProfile.vue'
import TweetFeed from '../components/TweetFeed.vue'
import TweetComments from '../components/TweetComment.vue'
import PageHeader from '../components/PageHeader.vue'
    export default {
        name: 'User',
        components: {
            UserProfile,
            TweetFeed,
            TweetComments,
            PageHeader
    },
        data() {
            
            return {
            userId: this.$route.params.id
            }
        },
        mounted(){
            this.userInfo()
        },
        methods:{
            userInfo (){
                axios.request({
                method: 'GET',
                url: 'https://tweeterest.ml/api/users',
                headers: {
                    'X-Api-Key' : process.env.VUE_APP_API_KEY,
                },
                params:{
                    'userId' : this.userId,
                } 
            }).then((response) => {
                this.userId = response.data[0].userId
                console.log(response)
            }).catch((error) =>{
                console.log(error+'error');
            })
            }
        }
        
    }
</script>

    <style scoped>

    </style>