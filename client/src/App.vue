<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Vue-Interest
          </v-list-item-title>
          <v-list-item-subtitle>
            MEVN Full Stack App
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item :to="{ name: 'home' }" link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="current_user" :to="{ name: 'my-posts', params: { usr: current_user } }" link>
            <v-list-item-icon>
              <v-icon>mdi-note</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Posts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="current_user" :to="{ name: 'add-post' }" link>
            <v-list-item-icon>
              <v-icon>mdi-note-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Add Post</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'about' }" link>
            <v-list-item-icon>
              <v-icon>mdi-help-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn color="info" plain :to="{ name: 'home' }">Vue-Interest</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-items class="hidden-sm-and-down">
        <v-btn plain disabled class="mr-2" v-if="current_user">{{ current_user }}</v-btn>
        <v-btn outlined color="green" class="mr-2" :to="{ name: 'login' }" v-if="!current_user">Login</v-btn>
        <v-btn outlined color="cyan" class="ml-2" :to="{ name: 'register' }" v-if="!current_user">Register</v-btn>
        <v-btn outlined color="red" class="ml-2" @click="logout" :to="{ name: 'login' }" v-if="current_user">Logout
        </v-btn>
      </v-app-bar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import bus from '../bus';
import USER_API from './api/user';

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Home', icon: 'mdi-home', link: "/" },
      { title: 'Add Post', icon: 'mdi-note-plus', link: "/add-post" },
      { title: 'About', icon: 'mdi-help-box', link: "/about" },

    ],
    current_user: null,
  }),
  props: {
    source: String,
  },
  mounted() {
    this.getUser();
    this.listenEvents();
  },
  methods: {
    listenEvents() {
      bus.$on('refreshUser', () => {
        this.getUser();
      });
    },
    async getUser() {
      return axios({
        method: 'get',
        url: '/api/current_user',
      })
        .then((res) => {
          this.current_user = res.data.current_user;
          localStorage.setItem('usr', this.current_user);
        })
        .catch(() => {
        });
    },
    async logout() {
      await USER_API.logout();
    }
  },
}
</script>