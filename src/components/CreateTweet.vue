<template>
    <div>
        <div>
        <v-card
            elevation="2"
        >
        <v-card-title>Tweet</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-text>
            <v-col
                cols="12"
                sm="6"
                md="3"
            >
            <v-text-field
                v-model="content"
                label="Tweet"
            ></v-text-field>
            </v-col>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="postTweet">Post</v-btn>
        </v-card-actions>
        </v-card>
        </div>

        <div></div>

        </div>

</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
    export default {
        name: 'CreateTweet',
        data: () => ({
            content: '',
            
        }),
        methods:{
            postTweet(){
                axios.request({
                    method: 'POST',
                    url: 'https://tweeterest.ml/api/tweets',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'token' : cookies.get('token'),
                    },
                    data: {
                        loginToken: cookies.get('token'),
                        content: this.content
                    }
                }).then((response)=>{
                    console.log(response);
                }).catch((error)=>{
                    console.error(error+'error');
                })
            },

        }

    }
</script>

<style scoped>

</style>