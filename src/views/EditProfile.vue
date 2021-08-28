<template>
    <div>
        <h1>Already signed up? Log in here</h1>
<v-row justify="center">
    <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
    >
        <v-card ref="form">
            <v-card-text>

            <v-text-field
            ref="username"
            v-model="username"
            :rules="[
            () => !!username || 'This field is required',
            () => !!username && username.length <= 10 || 'User Name must be less than 10 characters',
            userNameCheck
            ]"
            label="User Name"
            placeholder="enter user name"
            counter="10"
            required
        ></v-text-field>

            <template>
        <div data-app>
            <div class="mb-6">Enter Birthdate: <code>{{ birthdate || 'null' }}</code></div>
            <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                v-model="birthdate"
                label="Birthday"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="birthdate"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="1900-01-01"
                @change="save"
            ></v-date-picker>
            </v-menu>
        </div>
        </template>
        <v-card-text>
            <v-text-field
            ref="email"
            v-model="email"
            :rules="[() => !!email || 'This field is required']"
            :error-messages="errorMessages"
            label="email"
            placeholder="Enter email"
            required
            ></v-text-field>

        <v-text-field
            ref="bio"
            v-model="bio"
            :rules="[() => !!bio || 'This field is required']"
            :error-messages="errorMessages"
            label="Bio"
            placeholder="insert bio"
            required
        ></v-text-field>

        <v-text-field
            v-model="password"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="show4 ? 'text' : 'password'"
            name="input-10-2"
            label="Enter Password"
            hint="At least 4 characters"
            value=""
            error
            @click:append="show4 = !show4"
        ></v-text-field>

        </v-card-text>
        <v-card-actions>
        <v-btn @click="profile"  text>
            Cancel
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn @click="deleteProfile" text>Delete Profile</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="logoutUser" text>Logout</v-btn>
        <v-spacer></v-spacer>

        <v-slide-x-reverse-transition>
            <v-tooltip
                v-if="formHasErrors"
                left
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    class="my-0"
                    v-bind="attrs"
                    @click="resetForm"
                    v-on="on"
                >
                <v-icon>mdi-refresh</v-icon>
                </v-btn>
            </template>
            <span>Refresh form</span>
            </v-tooltip>
        </v-slide-x-reverse-transition>

        <v-btn
            color="primary"
            text
            @click="submit">
            Submit
        </v-btn>
        </v-card-actions>

        </v-card-text>
        </v-card>
    </v-col>
</v-row>

    </div>
</template>


<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        name: 'EditProfile',
                data: () => ({
            errorMessages: '',
            email: '',
            username: '',
            birthdate: '',
            bio: '',
            imageUrl: '',
            bannerUrl: '',
            show4: false,
            activePicker: null,
            menu: false,
            password: '',
            formHasErrors: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            }
        }),

    computed: {
        form () {
        return {
            email: this.email,
            password: this.password
        }
        },
    },

    watch: {
        name () {
        this.errorMessages = ''
        },
    },

    methods: {
        userNameCheck () {
            this.errorMessages = this.userName && !this.name
            ? `Hey! I'm required`
            : ''

            return true
        },
        save (birthdate) {
            this.$refs.menu.save(birthdate)
        },
        submit () {
            axios.request({
                method: 'PATCH',
                url: 'https://tweeterest.ml/api/users',
                headers: {
                    'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    'token' : cookies.get('token'),
                    'userId' : cookies.get('userId')
                },
                data: {
                    loginToken: cookies.get('token'),
                    bio: this.bio,
                    birthdate: this.birthdate,
                    email: this.email,
                    username: this.username,
                    bannerUrl: this.bannerUrl,
                    imageUrl: this.imageUrl
                }
                
            }).then((response) => {
                console.log(response);
                this.$router.push('Profile')
            }).catch((error)=>{
                console.error(error+"error");
            })
        },
        profile(){
            this.$router.push('Profile')
        },
        logoutUser(){
            axios.request({
                method: 'DELETE',
                url: 'https://tweeterest.ml/api/login',
                headers: {
                    'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    'token' : cookies.get('token'),
                    'userId' : cookies.get('userId')
                },
                data: {
                    loginToken: cookies.get('token')
                }
            }).then(() => {
                this.$router.push('/'),
                cookies.remove('token'),
                cookies.remove('userId')
            }).catch((error) => {
                console.log(error);
            })
        },

        deleteProfile(){
            axios.request({
                method: 'DELETE',
                url: 'https://tweeterest.ml/api/users',
                headers: {
                    'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    'token' : cookies.get('token'),
                    'userId' : cookies.get('userId')
                },
                data: {
                    loginToken: cookies.get('token'),
                    password: this.password
                }
                
            }).then(() => {
                this.$router.push('/'),
                cookies.remove('token'),
                cookies.remove('userId')
            }).catch((error)=>{
                console.error(error+"error");
            })
        }
    }
    }
</script>

<style scoped>

</style>