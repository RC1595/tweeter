<template>
    <div class="form">
        <div>
            <h1>Register Now</h1>
        </div>
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

        <!-- Date Picker -->
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

        <!-- email -->
        <v-text-field
            ref="email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
        ></v-text-field>

        <v-text-field
            v-model="password"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="show4 ? 'text' : 'password'"
            name="input-10-2"
            label="Enter Password"
            hint="At least 8 characters"
            value=""
            error
            @click:append="show4 = !show4"
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

        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
        <v-btn @click="resetForm" text>
            Cancel
        </v-btn>

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
            
            </v-tooltip>
        </v-slide-x-reverse-transition>

        <v-btn
            color="primary"
            text
            @click="submit">
            Submit
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-col>
</v-row>

</div>

</template>


<script>
    import axios from 'axios'
    export default {
        name: 'RegisterNew',
        components: {
            
        },
        data: () => ({
            errorMessages: '',
            bio: '',
            username: '',
            birthdate: '',
            email:'',
            password: 'Password',
            formHasErrors: false,
            show4: false,
            activePicker: null,
            menu: false,
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => (`The email and password you entered don't match`),
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
            },
        }),

    computed: {
        form () {
            return {
            bio: this.bio,
            userName: this.username,
            birthdate: this.birthdate,
            email: this.email,
            password: this.password
            }
        },
    },

    watch: {
        name () {
            this.errorMessages = ''
        },
        menu (val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },

    methods: {

        userNameCheck () {
            this.errorMessages = this.userName && !this.name
            ? `Hey! I'm required`
            : ''

            return true
        },
        //date picker vuetify
        save (birthdate) {
            this.$refs.menu.save(birthdate)
        },

        //reset form vuetify
        resetForm () {
            this.errorMessages = []
            this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
            this.$refs[f].reset()
            })
        },
        
        //Axios call to create user
        submit () {
        //     this.formHasErrors = false
        //     Object.keys(this.form).forEach(f => {
        //     if (!this.form[f]) this.formHasErrors = true,
        //     this.$refs[f].validate(true);
        // }),
            console.log(this.bio, this.username, this.birthdate, this.email, this.password);
            axios.request({
                method: 'POST',
                url: 'https://tweeterest.ml/api/users',
                headers: {
                    'X-Api-Key' : process.env.VUE_APP_API_KEY,
                },
                data: {
                    bio: this.bio,
                    username: this.username,
                    birthdate: this.birthdate,
                    email: this.email,
                    password: this.password
                },
                
            }).then((response) => {
                    console.log(response);
                    this.$router.push('LoginView')
            }).catch((error)=>{
                console.alert(error+"please fill out all required fields");
            })
        }

    },
    }
    

</script>

<style scoped>
.form {
    align-self: center;
    justify-self: center;
}

</style>