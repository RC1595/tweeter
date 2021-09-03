<template>
    <div>
        {{getTweetLikes()}}
        <!-- Button Icon from Vuetify -->
        <v-row>
                <v-col
                cols="12"
                sm="3"
            >
                <v-btn class='likeBtn' :class="{active:isActive}"
                @click="like(), likeCounter();"
                icon            
                >
                <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                <div>{{count}} </div>
            </v-col>
            
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        name: 'TweetLike',
        data: ()=>({
            isActive: true,
            count: 0,
            user: "",

        }),

        methods:{
            like(){
                if (this.isActive==false){
                    this.isActive = true;
                    console.log('false');
                }else{
                    this.isActive = false;
                    console.log('true');
                    
                }
            },
            getTweetLikes(){
                axios.request ({
                    method: 'GET',
                    url: "https://tweeterest.ml/api/tweet-likes",
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                },
                    params: {
                        "tweetId": this.tweetId
                    }
                }).then((response)=>{
                    console.log(response+'likes');
                }).catch((error)=>{
                    console.error(error+'error');
                })
            },
            likeCounter (){
                if (this.isActive == false){
                    this.count += 1;
                axios.request ({
                    method: 'POST',
                    url: "https://tweeterest.ml/api/tweet-likes",
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                },
                    data: {
                        'loginToken': cookies.get('token'),
                        'tweetId': 2047
                    }
                }).then((response)=>{
                    this.tweetId = response.data[0].userId
                    this.tweetId = response.data[0].username
                    console.log(response);
                }).catch((error)=>{
                    console.error(error+'error');
                })
            }else{
                this.count -=1;
                axios.request ({
                    method: 'DELETE',
                    url: "https://tweeterest.ml/api/tweet-likes",
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                },
                    data: {
                        'loginToken': cookies.get('token'),
                        'tweetId': this.tweetId
                    }
                }).then((response)=>{
                    console.log(response);
                }).catch((error)=>{
                    console.error(error+'error');
                })
                }
                
            },

        }
    }
</script>

<style scoped>
.likeBtn:active {
    color:purple;
    
}

</style>