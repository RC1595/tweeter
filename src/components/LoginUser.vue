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
            ref="email"
            v-model="email"
            :rules="[() => !!email || 'This field is required']"
            :error-messages="errorMessages"
            label="email"
            placeholder="Enter email"
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

                <v-card-actions>
        <v-btn @click="goHome"  text>
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
        name: 'LoginUser',
        data: () => ({
            errorMessages: '',
            email: '',
            show4: false,
            password: 'password',
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
        submit () {
            console.log(this.email, this.password);
            axios.request({
                method: 'POST',
                url: 'https://tweeterest.ml/api/login',
                headers: {
                    'X-Api-Key' : process.env.VUE_APP_API_KEY,
                },
                data: {
                    email: this.email,
                    password: this.password,
                }
                
            }).then((response) => {
                cookies.set('token',response.data.loginToken)
                console.log(cookies.get('token'));
                cookies.set('userId',response.data.userId)
                console.log(cookies.get('userId'));
                this.$router.push('Profile')
                console.log(response);
            }).catch((error)=>{
                console.error(error+"error");
            })
        },
        goHome() {
            this.$router.push('/')
        }
    }
    }

</script>

<style scoped>

</style>