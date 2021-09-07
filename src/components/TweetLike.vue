<template>
    <div>
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
                <v-icon id='icon'>mdi-thumb-up</v-icon>
                </v-btn>
                <div id= 'counter'>{{count}} </div>
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
            userId: "",
            

        }),
        mounted(){
            this.getTweetLikes()
        },
        computed: {
            users: () => {
                return this.tweetId.filter(user=> user.userId)
            }
        },

        methods:{

            //like toggle            
            like(){
                if (this.isActive==false){
                    this.isActive = true;
                    console.log('false');
                }else{
                    this.isActive = false;
                    console.log('true');
                    
                }
            },

            //axios call to get tweets
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
                    console.log(response);
                }).catch((error)=>{
                    console.error(error+'error');
                })
            },

            //Counter 
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
                        'tweetId': this.tweetId
                    }
                }).then((response)=>{
                    response.filter(this.data[0].userId)
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
#icon {
    margin-left: 4vw;
    color:purple;
    
}
#icon:active {
    color:black;
}
#counter {
    padding-left: 3vw;
}



</style>