<template>
    <div id="cardBackground">
        <div>
            <div v-for="tweet in tweets.slice().reverse()" 
            :key="tweet.tweetId"
            v-bind="tweet">
            <template>
            <v-card id="tweetCard"
                class="mx-auto"
                color="#ffb6c1"
                dark
                max-width="400"
                align-items="center"
            >
                <v-card-title>
                <v-icon
                    large
                    left
                >
                    {{tweet.userImageUrl}}
                </v-icon>
                <span class="text-h6 font-weight-light">{{tweet.username}}</span>
                </v-card-title>

                <v-card-text id="tweetContent" class="text-h5 font-weight-bold">
                {{tweet.content}}
                </v-card-text>

                <v-card-actions>
                <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                    <v-img>
                        {{tweet.tweetImageUrl}}
                    </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title id="tweetTime">{{tweet.createdAt}}</v-list-item-title>
                    <v-list-item-title></v-list-item-title>
                    </v-list-item-content>
                    <TweetLike/>
                    <FollowUser/>
                    <v-row
                    align="center"
                    justify="end"
                    >
                    <div>
                        <v-btn
                            
                            class="mx-3"
                            fab
                            dark
                            small
                            color="cyan"
                            >
                        <v-icon dark>
                            mdi-pencil
                        </v-icon>
                        </v-btn>
                    </div>

                    </v-row>
                </v-list-item>
                </v-card-actions>
            </v-card>
        </template>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios"
import TweetLike from './TweetLike.vue'
import FollowUser from './FollowUser.vue'
    export default {
        name: "TweetFeed",
        components: {TweetLike, FollowUser},
        props: {
            userId: Number
        },

        data: () => ({
            content: '',
            tweets: [],
            users: []
        }),
        mounted(){
            this.userTweets()
            // this.$router.push('Profile')
        },
        methods: {       
            userTweets(){
                axios.request({
                    method: "GET",
                    url: 'https://tweeterest.ml/api/tweets',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        
                    },
                    params: {
                        'userId' : this.userId 
                    }
                }).then((response)=>{
                    this.tweets = response.data;
                    console.log(response);
                }).catch((error)=>{
                    console.error(error+'error');
                })
            }
        },
    }

</script>

<style scoped>
#cardBackground {
    background-color:rgb(56, 99, 56)
}

#tweetCard {
    background-color:#ffb6c1;
    border: 1px solid black;
    color: black;
    margin-bottom: 1vh;
    align-items: center;
}
#tweetContent {
    color: black;
}
#tweetTime {
    color: black;
}

</style>