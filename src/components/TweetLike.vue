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
                <v-icon>mdi-thumb-up</v-icon>
                </v-btn> {{count}}
            </v-col>
            
        </v-row>
    </div>
</template>

<script>
    export default {
        name: 'TweetLike',
        data: ()=>({
            isActive: true,
            count: 0,
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
            likeCounter (){
                if (this.isActive == false){
                    this.count += 1;
                }else{
                    this.count -=1;
                }
                
            }
        }
    }
</script>

<style scoped>
.likeBtn:active {
    color:purple;
    
}

</style>