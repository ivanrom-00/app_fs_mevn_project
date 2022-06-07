<template>
  <v-container>

    <v-row justify="center" no-gutters>
      <v-expansion-panels popout>
        <v-expansion-panel>
          <v-expansion-panel-header>How does this app work?</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>This is a social network were plenty of users can share several interest posts, adding a title, category, content and image so that other users can see those posts.</p>
            <p>Only registered users can share posts. And you can only edit and delete a post if you are the author of the post.</p>
            <p>So, what are you waiting for? Create an account and star sharing your interests with other VUE users!</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Institutional info...</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Tecnológico Nacional de México</p>
            <p>Intituto Tecnológico de la Laguna</p>
            <p>Ingeniería en Sistemas Computacionales</p>
            <p>Pila Completa 1</p>
            <p>Ing. Juan Carlos Rodríguez Ulloa</p>
            <p>Semestre: Ene-Jun 2022</p>
            <p>Todos los derechos reservados &copy;</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Team Members</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>M Team</p>
            <p>18131210 Jesús Francisco Aguilera Guajardo</p>
            <p>18131210 Iván Romero Canaán</p>
            <p>18131319 Iván Enrique González Ruiz</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Developed With...</v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul>
              <li>Mongo</li>
              <li>Express</li>
              <li>Vue</li>
              <li>Node Js</li>
              <li>MVC</li>
              <li>Mongoose</li>
              <li>Vuetify</li>
              <li>Swal</li>
              <li>Axios</li>
              <li>Star rating</li>
              <li>Passport</li>
              <li>Passport Local Strategy</li>
              <li>Passport Google Strategy</li>
              <li>Passport Facebook Strategy</li>
              <li>Passport Twitter Strategy</li>
              <li>Passport LinkedIn Strategy</li>
              <li>Jest</li>
              <li>Vuex</li>
              <li>MongoDB Atlas</li>
              <li>Heroku</li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="logged">
          <v-expansion-panel-header>Rate This App</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="pa-5">
              <!-- <v-card-title>Rate App</v-card-title> -->
              <v-card-text v-if="selected == false">
                <v-hover v-slot:default="{ hover }">
                  <v-icon :color="hover || stars >= 1 ? 'orange' : 'grey'" @mouseover="stars = 1"
                    @mouseleave="stars = 0" x-large @click="selectStar(1)">mdi-star</v-icon>
                </v-hover>
                <v-hover v-slot:default="{ hover }">
                  <v-icon :color="hover || stars >= 2 ? 'orange' : 'grey'" @mouseover="stars = 2"
                    @mouseleave="stars = 0" x-large @click="selectStar(2)">mdi-star</v-icon>
                </v-hover>
                <v-hover v-slot:default="{ hover }">
                  <v-icon :color="hover || stars >= 3 ? 'orange' : 'grey'" @mouseover="stars = 3"
                    @mouseleave="stars = 0" x-large @click="selectStar(3)">mdi-star</v-icon>
                </v-hover>
                <v-hover v-slot:default="{ hover }">
                  <v-icon :color="hover || stars >= 4 ? 'orange' : 'grey'" @mouseover="stars = 4"
                    @mouseleave="stars = 0" x-large @click="selectStar(4)">mdi-star</v-icon>
                </v-hover>
                <v-hover v-slot:default="{ hover }">
                  <v-icon :color="hover || stars >= 5 ? 'orange' : 'grey'" @mouseover="stars = 5"
                    @mouseleave="stars = 0" x-large @click="selectStar(5)">mdi-star</v-icon>
                </v-hover>
              </v-card-text>
              <v-card-text v-if="selected">
                <v-icon :color="stars >= 1 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
                <v-icon :color="stars >= 2 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
                <v-icon :color="stars >= 3 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
                <v-icon :color="stars >= 4 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
                <v-icon :color="stars == 5 ? 'orange' : 'grey'" x-large @click="selected = false">mdi-star</v-icon>
              </v-card-text>
              <v-btn class="ml-5" color="indigo" outlined @click="rate">Rate</v-btn>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      stars: 0,
      selected: false,
      logged: false,
      usr: '',
    }
  },
  async created() {
    this.selected = this.$store.getters.selectedStar;
    this.$stars = this.$store.getters.stars;
    this.logged = localStorage.getItem('usr');
    this.usr = localStorage.getItem('usr');
  },
  methods: {
    selectStar(n) {
      this.selected = true;
      // this.$stars = n;
      this.$store.state.stars = n;
      this.$store.state.starPosition = n;
      this.$store.dispatch('setStarsAction');
      this.$stars = this.$store.getters.stars;

    },
    async rate() {
      return axios({
        method: 'put',
        data: {
          usr: this.usr,
          value: this.stars,
        },
        url: '/api/rating/',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.$swal({
          title: 'Thanks!',
          text: 'Thank you for rating our app',
          type: 'Success',
        });
      })
        .catch((err) => {
          this.$swal({
            title: 'Error',
            text: 'Something went wrong',
            type: 'error',
          });
        });
    }
  }
}
</script>