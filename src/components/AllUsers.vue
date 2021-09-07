<template>
    <div>
        <div v-for="user in users" :key="user" v-bind="user[0]">
            <template>
                <v-card
            class="mx-auto"
            color="green"
            dark
            max-width="400"
        >
            <v-card-title>
            <v-icon
                large
                left
            >
                {{bannerUrl}}
            </v-icon>
            <span class="text-h6 font-weight-light">{{username}}</span>
            </v-card-title>

            <v-card-text class="text-h5 font-weight-bold">
            {{bio}}
            </v-card-text>

            <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                <v-img>
                    {{imageUrl}}
                </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                <v-list-item-title class='z-index 2'>{{birthdate}}</v-list-item-title>
                <v-list-item-title>{{email}}</v-list-item-title>
                </v-list-item-content>
                <v-row
                align="center"
                justify="end"
                >
                </v-row>
            </v-list-item>
            </v-card-actions>
        </v-card>
            </template>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "AllUsers",
        data: () => ({
            users: [],
            username: '',
            birthdate: '',
            email: '',
            bio: '',
            bannerUrl: '',
            imageUrl: '',
        }),
        mounted () {
            this.getAllUsers();
        },
        methods: {
            getAllUsers(){
            axios.request({
                method: 'GET',
                url: 'https://tweeterest.ml/api/users',
                headers: {
                    'X-Api-Key' : process.env.VUE_APP_API_KEY,
                }, 
            }).then((response) => {
                this.users = response.data.userId
                this.username = response.data[0].username
                this.birthdate = response.data[0].birthdate
                this.email = response.data[0].email
                this.bio = response.data[0].bio
                this.imageUrl = response.data[0].imageUrl
                this.bannerUrl = response.data[0].bannerUrl
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