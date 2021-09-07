<template>
    <div>
        <!-- Button Icon from Vuetify -->
        <v-row>
                <v-btn class='follow' :class="{active:isActive}"
                @click="follow"> Follow</v-btn>
        </v-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'
    export default {
        name: "FollowUser",
        props: {
            followId: Number
        },
        data: () => ({
            isActive: false,

        }),
        methods: {
            //conditional toggle of follow button
            follow(){
                if (this.isActive == true){
                    this.isActive = true;
                    axios.request({
                        method: 'POST',
                        url: 'https://tweeterest.ml/api/follows',
                        headers: {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        },
                        data: {
                            loginToken: cookies.get('token'),
                            followId: this.followId
                            }
                    }).then((response)=>{
                        console.log(response);
                        console.log('follow call sent');
                    }).catch((error)=>{
                        console.error(error+'error');
                    })
                }else{
                    this.isActive = false;
                    axios.request({
                        method: 'DELETE',
                        url: 'https://tweeterest.ml/api/follows',
                        headers: {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            },
                            data: {
                                loginToken: cookies.get('token'),
                                followId: this.followId
                            }
                    }).then((response)=>{
                        console.log(response);
                        console.log('DELETE request sent');
                    }).catch((error)=>{
                        console.error(error+'error');
                    })
                }
            }
        }
    }
</script>

<style scoped>
.follow{
    margin-left:5vw;
}
.follow:active{
    background-color: teal;
}

</style>