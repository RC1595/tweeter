<template>
<div>
    <div>
        {{this.userData()}}
        
    </div>
    <div>
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
                <v-list-item-title :followId="followId"></v-list-item-title>
                </v-list-item-content>
                <FollowUser/>
                <v-row
                align="center"
                justify="end"
                >
                <v-btn id= 'pencil'>
                    <v-icon class='pencilIcon w-2' @click="editor">{{ icons.mdiPencil }}</v-icon>
                </v-btn>


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
    import FollowUser from './FollowUser.vue'
    import {
        mdiPencil,
    }from '@mdi/js'
    export default {
        name: 'UserProfile',
        components:{
            FollowUser
        },
        props: {
            userId: Number,
            followId: Number
        },
        data: () => ({
            username: '',
            birthdate: '',
            email: '',
            bio: '',
            bannerUrl: '',
            imageUrl: '',
            icons: {
                mdiPencil
            }
        }),
        
        methods: {
            userData(){
            axios.request({
                method: 'GET',
                url: 'https://tweeterest.ml/api/users',
                headers: {
                    'X-Api-Key' : process.env.VUE_APP_API_KEY,
                },
                params:{
                    'userId': this.userId,
                } 
            }).then((response) => {
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
        },
        editor(){
            this.$router.push('EditProfile')
        }
        }
    }
    
</script>

<style scoped>
.pencilIcon{
    align-items: end;
    justify-items: end;
}

</style>