<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Login with Account</v-card-title>
                    <v-divider></v-divider>
                    <!-- <div class="login">
                            <a class="btn facebook" href="/login/facebook">Acceder con Facebook</a>
                            <a class="btn twitter" href="/login/twitter">Acceder con Twitter</a>
                            <a class="btn google" href="/login/google">Acceder con Google</a>
                        </div> -->
                    <v-form v-model="valid" ref="form" class="pa-5" enctype="multipart/form-data">
                        <v-text-field name="email" label="Email" v-model="email" prepend-icon="mdi-email"
                            :rules="[rules.required, rules.email]" required>
                        </v-text-field>
                        <v-text-field label="Password" v-model="password" prepend-icon="mdi-lock"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]"
                            :type="show ? 'text' : 'password'" name="password" @click:append="show = !show">
                        </v-text-field>
                        <v-btn @click="send" :disabled="!valid" class="mt-3 mr-2" color="primary">Login</v-btn>

                    </v-form>
                </v-card>
                <v-card class="pa-5 mt-5">
                    <v-card-title>Login with Social Media</v-card-title>
                    <v-divider></v-divider>
                    <v-btn @click="google" class="mt-3 ml-2" color="primary">
                        <v-icon>mdi-google</v-icon>
                        Google
                    </v-btn>
                    <v-btn @click="facebook" class="mt-3 ml-2" color="primary">
                        <v-icon>mdi-facebook</v-icon>
                        Facebook
                    </v-btn>
                    <v-btn @click="twitter" class="mt-3 ml-2" color="primary">
                        <v-icon>mdi-twitter</v-icon>
                        Twitter
                    </v-btn>
                    <v-btn @click="linkedin" class="mt-3 ml-2" color="primary">
                        <v-icon>mdi-linkedin</v-icon>
                        LinkedIn
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import bus from '../../bus';

export default {
    data: () => ({
        valid: true,
        show: false,
        email: '',
        password: '',
        url: 'http://localhost:5000',
        url_online: 'https://vue-interest.herokuapp.com',
        rules: {
            required: value => !!value || 'Required.',
            email: v => /\S+@\S+\.\S+/.test(v) || 'Email must be valid',
        },
    }),
    mounted() {
        this.create();
    },
    methods: {
        async create() {
            if (window.localStorage) {
                if (!localStorage.getItem('firstLoad')) {
                    localStorage['firstLoad'] = true;
                    this.$router.go(0);
                }
                else {
                    localStorage.removeItem('firstLoad');
                    localStorage.removeItem('usr');
                }
            }
        },
        async send() {
            return axios({
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password,
                },
                url: '/api/user/login',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    this.$swal({
                        title: 'Congrats!',
                        text: 'You\'re ready to begin',
                        type: 'Success',
                    });
                    this.$router.push({ name: 'home' });
                    this.$router.go(0);
                })
                .catch((error) => {
                    this.$swal({
                        title: 'Error',
                        text: 'Wrong username or password',
                        type: 'error',
                    });
                });
        },
        async google() {
            window.open(`${this.url}/google`, '_blank').focus();
            this.$router.push({ name: 'home' });
        },
        async facebook() {
            window.open(`${this.url}/facebook`, '_blank').focus();
            this.$router.push({ name: 'home' });
        },
        async twitter() {
            this.$swal({
                title: 'Comming soon...',
                text: 'This feature will be added some day',
                type: 'Success',
            });
            // window.open(`${this.url}/twitter`, '_blank').focus();
            // this.$router.push({ name: 'home' });
        },
        async linkedin() {
            this.$swal({
                title: 'Comming soon...',
                text: 'This feature will be added some day',
                type: 'Success',
            });
            // window.open(`${this.url}/linkedin`, '_blank').focus();
            // this.$router.push({ name: 'home' });
        },
    },
};
</script>
